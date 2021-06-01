const mongoose = require('mongoose')

//esse e o modelo a ser salvo no banco de dados, so e salvo nesse formato
const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    note: {type: String, required: true}
})

//aqui e a definição do modelo e o export
module.exports = mongoose.model('Note',noteSchema)