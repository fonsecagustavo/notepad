const Note = require('../models/Note')

const allNotas = async (req,res) => {
    try {
        let docs = await Note.find({})
        res.render('all',{note: docs})
    } catch (error) {
        res.send(error)
    }
}

const addNote = async (req,res) => {
    let note = new Note(req.body)
    try {
        await note.save()
        res.redirect('/')
    } catch (error) {
        res.send(error)
    }
}

const deleteNote = async (req,res) => {
    let id = req.params.id
    if(!id){
        id = req.body.id
    }
    try {
        await Note.findByIdAndDelete(id)
        res.redirect('/')
    } catch (error) {
        res.status(404).send(error)
    }
}

const loadNote = async (req,res) => {
    let id = req.params.id
    try {
        let doc = await Note.findById(id)
        res.render('edit',{error:false, body: doc})
    } catch (error) {
        res.status(404).send(error)
    }
}

const editNote = async (req,res) => {
    let note = {}
    note.title = req.body.title
    note.note = req.body.note

    let id =req.params.id
    if(!id){
        id = req.body.id
    }
    try {
        await Note.updateOne({_id:id},note)
        res.redirect('/')
    } catch (error) {
        res.render('edit', {error, body: req.body})
    }
}

module.exports = {allNotas, addNote, deleteNote,loadNote,editNote}