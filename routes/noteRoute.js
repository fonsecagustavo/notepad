const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

const noteController = require('../controllers/noteController')

router.use(methodOverride('_method'))

router.get('/',noteController.allNotas)
router.get('/add',(req,res)=> res.render('add', {error:false, body: {}}))
router.get('/edit/:id', noteController.loadNote)

router.post('/',express.urlencoded({extended: true}), noteController.addNote)
router.post('/edit/:id',express.urlencoded({extended: true}),noteController.editNote)

router.delete('/:id', noteController.deleteNote)
router.delete('/',express.urlencoded({extended: true}), noteController.deleteNote)

module.exports = router