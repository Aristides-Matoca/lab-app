const express = require('express')
const body_parser = require('body-parser')

const app = express()
const port = 5005

app.use(body_parser.json())

app.get('/', (req, res) => {
    res.send('Back-end API rodando com sucesso!!!')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})