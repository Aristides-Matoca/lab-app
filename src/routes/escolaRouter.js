const router = require('express').Router()
const EscolaController = require('../controller/escolaController')

router.post('/insertEscola', EscolaController.insertEscola)
router.put('/updateEscola', EscolaController.updateEscola)
router.delete('/deleteEscola', EscolaController.deleteEscola)
router.get('/selectEscolas', EscolaController.selectEscolas)
router.get('/selectEscola', EscolaController.selectEscola)
module.exports = router