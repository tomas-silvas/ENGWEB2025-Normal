var mongoose = require("mongoose");

var edicaoSchema = new mongoose.Schema({
    _id: String, // Identificador único da edição
    id: String, // ID da edição
    anoEdicao: String, // Ano da edição
    musicas: [
        {
            id: String, // ID da música
            link: String, // Link para a música
            titulo: String, // Título da música
            pais: String, // País participante
            compositor: String, // Compositor da música
            interprete: String, // Intérprete da música
            letra: String // Letra da música (opcional)
        }
    ],
    organizacao: String, // País organizador
    vencedor: String // País vencedor
}, { versionKey: false });

// Exportar o modelo
module.exports = mongoose.model('Edicao', edicaoSchema, 'edicoes');