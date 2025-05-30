var express = require('express');
var router = express.Router();
const axios = require('axios');
const apiURL = 'http://localhost:25000/';

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get(apiURL + 'edicoes')
    .then(resp => {
      const edicoes = resp.data.map(edicao => ({
        id: edicao._id, // Ajustado para usar _id
        anoEdicao: edicao.anoEdicao,
        organizacao: edicao.organizacao,
        vencedor: edicao.vencedor,
        links: {
          idLink: `/edicoes/${edicao._id}`, // Ajustado para usar _id
          organizacaoLink: `/paises/${edicao.organizacao}`,
          vencedorLink: `/paises/${edicao.vencedor}`
        }
      }));
      res.status(200).render("edicoesListPage", { edicoes, date });
    })
    .catch(erro => res.status(500).render("error", { error: erro }));
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get(`${apiURL}edicoes/${req.params.id}`)
    .then(resp => {
      const edicao = {
        id: resp.data._id,
        anoEdicao: resp.data.anoEdicao,
        organizacao: resp.data.organizacao,
        vencedor: resp.data.vencedor,
        musicas: resp.data.musicas.map(musica => ({
          titulo: musica.titulo,
          interprete: musica.interprete,
          pais: musica.pais
        }))
      };
      res.status(200).render("edicaoPage", { edicao, date });
    })
    .catch(erro => res.status(500).render("error", { error: erro }));
});


router.get('/paises/:pais', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  const pais = req.params.pais;

  axios.get(`${apiURL}edicoes`)
    .then(resp => {
      const edicoes = resp.data;

      // Filtrar edições em que o país participou
      const participacoes = edicoes
        .filter(edicao => Array.isArray(edicao.musicas) && edicao.musicas.some(musica => musica.pais === pais))
        .map(edicao => ({
          id: edicao._id,
          anoEdicao: edicao.anoEdicao,
          musicas: edicao.musicas
            .filter(musica => musica.pais === pais)
            .map(musica => ({
              titulo: musica.titulo,
              interprete: musica.interprete,
              venceu: edicao.vencedor === pais
            }))
        }));

      // Filtrar edições organizadas pelo país
      const organizacoes = edicoes
        .filter(edicao => edicao.organizacao === pais)
        .map(edicao => ({
          id: edicao._id,
          anoEdicao: edicao.anoEdicao
        }));

      res.status(200).render("paisPage", { pais, participacoes, organizacoes, date });
    })
    .catch(erro => res.status(500).render("error", { error: erro }));
});


module.exports = router;
