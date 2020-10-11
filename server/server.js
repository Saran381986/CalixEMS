const express = require('express')
const jwt = require('jsonwebtoken')
const bodyparser = require('body-parser')
const cors1 = require('cors')

const PORT = 3000
const api= require('./routes/api')
const app = express()
app.use(cors1())

app.use(bodyparser.json())

app.use('/api',api)
app.get('/', function(req,res)
{
    res.send('Hello from server')
})

app.listen (PORT, function(){
    console.log('Server running on local host '+ PORT)
})