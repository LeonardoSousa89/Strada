const port = 80

const express = require('express')
const app = express()

app.get('/', (req, res)=>{

    res.send('vex api server 1, testing on nginx reverse proxy')
})

app.get('/id/:id', (req, res)=>{

   res.send(`vex api server 1, testing on nginx reverse proxy with id ${ req.params.id }`)
})

app.get('/query', (req, res)=>{

    res.send(`vex api server 1, testing on nginx reverse proxy with id ${ req.query.id }`)
})

app.listen(port)