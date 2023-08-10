const port = 80

const express = require('express')
const app = express()

app.get('/', (req, res)=>{

    res.send('vex api server 2, testing on nginx reverse proxy')
})

app.listen(port)