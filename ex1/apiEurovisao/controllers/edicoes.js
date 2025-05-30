var Edicao = require('../models/edicao');

// Controller para listar todas as edições (campos: anoEdicao, organizacao e vencedor)
module.exports.listEdicoes = () => {
    return Edicao
        .find({}, { anoEdicao: 1, organizacao: 1, vencedor: 1 })
        .exec();
};

// Controller para listar edições organizadas por um país específico (campos: anoEdicao, organizacao e vencedor)
module.exports.getEdicoesByOrganizacao = (organizacao) => {
    return Edicao
        .find({ organizacao: organizacao }, { anoEdicao: 1, organizacao: 1, vencedor: 1 })
        .exec();
};

// Controller para obter toda a informação de uma edição específica pelo ID
module.exports.getEdicaoById = (id) => {
    return Edicao
        .findById(id)
        .exec();
};

// Controller para listar países organizadores (ordenados alfabeticamente, com lista de anos)
module.exports.getPaisesOrganizadores = () => {
    return Edicao.aggregate([
        { $group: { _id: "$organizacao", anos: { $push: "$anoEdicao" } } },
        { $sort: { _id: 1 } }
    ]).exec();
};

// Controller para listar países vencedores (ordenados alfabeticamente, com lista de anos)
module.exports.getPaisesVencedores = () => {
    return Edicao.aggregate([
        { $group: { _id: "$vencedor", anos: { $push: "$anoEdicao" } } },
        { $sort: { _id: 1 } }
    ]).exec();
};

// Controller para listar intérpretes com o nome e o país que representaram, ordenados alfabeticamente e sem repetições
module.exports.getInterpretes = () => {
    return Edicao.aggregate([
        { $unwind: "$musicas" }, // Desestrutura o array de músicas
        { $group: { _id: { nome: "$musicas.interprete", pais: "$musicas.pais" } } }, // Agrupa por intérprete e país
        { $sort: { "_id.nome": 1 } } // Ordena alfabeticamente pelo nome do intérprete
    ]).exec();
};

// Controller para adicionar uma nova edição
module.exports.addEdicao = (edicao) => {
    return Edicao.create(edicao);
};

// Controller para atualizar uma edição pelo ID
module.exports.updateEdicao = (id, edicao) => {
    return Edicao.findByIdAndUpdate(id, edicao, { new: true }).exec();
};

// Controller para remover uma edição pelo ID
module.exports.deleteEdicao = (id) => {
    return Edicao.findByIdAndDelete(id).exec();
};
