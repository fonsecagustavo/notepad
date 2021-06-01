//aqui ficam os crontroladores de rotas, onde controla quando e adicionando uma nova nota ou editado ou deletado

//importa a Note
const Note = require('../models/Note')

//pagina para exibir todas as notas
const allNotas = async (req,res) => {
    try {
        let docs = await Note.find({})//carrega todas as notas
        res.render('all',{note: docs})//e manda para a pagina all
    } catch (error) {
        res.send(error)
    }
}

//Adiciona uma nova nova no banco de dados
const addNote = async (req,res) => {
    let note = new Note(req.body)//pega a nota no form do body
    try {
        await note.save()//salva no banco de dados
        res.redirect('/')//e redireciona a pagina all
    } catch (error) {
        res.send(error)
    }
}

//deleta uma nota no banco de dados atravez do id
const deleteNote = async (req,res) => {
    let id = req.params.id //pega o id pela URL
    if(!id){
        id = req.body.id // se nao tiver na URL e pego pelo form, ja que foi usado method-override e possivel
    }
    try {
        await Note.findByIdAndDelete(id)//e feito a exclusao pelo id
        res.redirect('/')//volta para a pagina all
    } catch (error) {
        res.status(404).send(error)
    }
}

//carrega uma nota na pagina de editar
const loadNote = async (req,res) => {
    let id = req.params.id//pega o id pelo URL
    try {
        let doc = await Note.findById(id) // faz a busca pelo id
        res.render('edit',{error:false, body: doc}) //coloca na pagina de edit com as informações obtidas
    } catch (error) {
        res.status(404).send(error)
    }
}

//edita a nota no banco de dados
const editNote = async (req,res) => {
    //informações vinda pelo form e colocada no objeto note
    let note = {}
    note.title = req.body.title
    note.note = req.body.note

    let id =req.params.id //pega o id para o update
    if(!id){
        id = req.body.id
    }
    try {
        await Note.updateOne({_id:id},note) //faz o update apenas para o arquivo em si
        res.redirect('/')//e volta para a pagina all
    } catch (error) {
        res.render('edit', {error, body: req.body})
    }
}

module.exports = {allNotas, addNote, deleteNote,loadNote,editNote}