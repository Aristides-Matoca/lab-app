const router = require('express').Router()
const EscolaController = require('../controller/escolaController')

router.post('/insert-escola', EscolaController.insertEscola)
router.put('/update-escola/:id', EscolaController.updateEscola)
router.delete('/delete-escola/:id', EscolaController.deleteEscola)
router.get('/select-escolas', EscolaController.selectEscolas)
router.get('/select-escola/:id', EscolaController.selectEscola)
module.exports = router