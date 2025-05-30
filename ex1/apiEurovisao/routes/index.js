var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicoes');

// GET /edicoes: devolve uma lista com todas as edições (campos: anoEdicao, organizacao e vencedor)
router.get('/edicoes', function(req, res, next) {
    if (req.query.org) {
        // GET /edicoes?org=EEEE: devolve a lista das edições organizadas por EEEE
        Edicao.getEdicoesByOrganizacao(req.query.org)
            .then((result) => {
                res.status(200).jsonp(result);
            })
            .catch((err) => {
                res.status(500).jsonp(err);
            });
    } else {
        // Lista todas as edições
        Edicao.listEdicoes()
            .then((result) => {
                res.status(200).jsonp(result);
            })
            .catch((err) => {
                res.status(500).jsonp(err);
            });
    }
});

// POST /edicoes: acrescenta um registo novo à BD, neste caso, uma nova edição
router.post('/edicoes', function(req, res, next) {
  Edicao.addEdicao(req.body)
      .then((result) => {
          res.status(201).jsonp(result);
      })
      .catch((err) => {
          res.status(500).jsonp(err);
      });
});


// GET /paises?papel=org: devolve a lista dos países organizadores, ordenada alfabeticamente por nome e sem repetições
// GET /paises?papel=venc: devolve a lista dos países vencedores, ordenada alfabeticamente por nome e sem repetições
router.get('/paises', function(req, res, next) {
    if (req.query.papel === 'org') {
        // Query para países organizadores
        Edicao.getPaisesOrganizadores()
            .then((result) => {
                res.status(200).jsonp(result.map(item => ({ pais: item._id, anos: item.anos })));
            })
            .catch((err) => {
                res.status(500).jsonp(err);
            });
    } else if (req.query.papel === 'venc') {
        // Query para países vencedores
        Edicao.getPaisesVencedores()
            .then((result) => {
                res.status(200).jsonp(result.map(item => ({ pais: item._id, anos: item.anos })));
            })
            .catch((err) => {
                res.status(500).jsonp(err);
            });
    } else {
        res.status(400).jsonp({ error: "Parâmetro 'papel' inválido ou ausente." });
    }
});

// GET /interpretes: devolve a lista dos intérpretes, com o nome e o país que o intérprete representou, ordenada alfabeticamente por nome e sem repetições
router.get('/interpretes', function(req, res, next) {
  Edicao.getInterpretes()
      .then((result) => {
          res.status(200).jsonp(result.map(item => ({ nome: item._id.nome, pais: item._id.pais })));
      })
      .catch((err) => {
          res.status(500).jsonp(err);
      });
});

// GET /edicoes/:id: devolve toda a informação da edição com identificador id
router.get('/edicoes/:id', function(req, res, next) {
  Edicao.getEdicaoById(req.params.id)
      .then((result) => {
          res.status(200).jsonp(result);
      })
      .catch((err) => {
          res.status(500).jsonp(err);
      });
});


// PUT /edicoes/:id: altera o registo da edição com o identificador id
router.put('/edicoes/:id', function(req, res, next) {
  Edicao.updateEdicao(req.params.id, req.body)
      .then((result) => {
          res.status(200).jsonp(result);
      })
      .catch((err) => {
          res.status(500).jsonp(err);
      });
});

// DELETE /edicoes/:id: elimina da BD o registo correspondente à edição com o identificador id
router.delete('/edicoes/:id', function(req, res, next) {
  Edicao.deleteEdicao(req.params.id)
      .then((result) => {
          res.status(200).jsonp({ message: "Edição eliminada com sucesso!", result });
      })
      .catch((err) => {
          res.status(500).jsonp(err);
      });
});




module.exports = router;