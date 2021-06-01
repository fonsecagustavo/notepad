const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

//serve para que o formulario possa mandar um method delete, pois formularios não mandam naturalmente.
const noteController = require('../controllers/noteController')

router.use(methodOverride('_method'))

//rotas get para redirecionamento para as paginas de adicionar, editar e visualizar
router.get('/',noteController.allNotas)
router.get('/add',(req,res)=> res.render('add', {error:false, body: {}}))
router.get('/edit/:id', noteController.loadNote)

//rotas post para adicionar e editar no banco de dados
router.post('/',express.urlencoded({extended: true}), noteController.addNote)
router.post('/edit/:id',express.urlencoded({extended: true}),noteController.editNote)

//rotas delete para deletar aquivos no banco de dados
router.delete('/:id', noteController.deleteNote)
router.delete('/',express.urlencoded({extended: true}), noteController.deleteNote)

module.exports = router