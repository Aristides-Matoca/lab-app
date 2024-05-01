const express = require('express')
const body_parser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const escolaRoute = require('./routes/escolaRouter')
const uploadRoute = require('./service/uploadExcel')
// Inserir as provincias na base de dados
// const insertProvinces = require('./controller/provinceController')

// insertProvinces()
const app = express()
const port = 5005

app.use(body_parser.json())

app.use('/', escolaRoute)
app.use('/', uploadRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('Back-end API rodando com sucesso!!!')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})