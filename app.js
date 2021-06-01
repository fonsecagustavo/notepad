const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const path = require('path')
const noteRoute = require('./routes/noteRoute')

//banco de dados
mongoose.connect('mongodb://localhost/notepad', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', ()=> {console.log('erro')})
db.once('open', ()=> {
    console.log('banco de dados')
})

//ejs
app.set('views', path.join(__dirname,'./views'))
app.set('view engine','ejs')

//servidor
app.use('/', noteRoute)
app.listen(port,()=> {
    console.log("Server running...")
})

