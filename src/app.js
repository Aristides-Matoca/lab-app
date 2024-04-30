const express = require('express')
const body_parser = require('body-parser')
const escolaRoute = require('./routes/escolaRouter')
// const insertProvinces = require('./controller/provinceController')

// insertProvinces()
const app = express()
const port = 5005

app.use(body_parser.json())

app.use('/', escolaRoute)

app.get('/', (req, res) => {
    res.send('Back-end API rodando com sucesso!!!')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})