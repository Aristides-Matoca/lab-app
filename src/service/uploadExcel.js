const router = require('express').Router()
const upload = require('../config/multerconfig')
const { loadExcel } = require('./loadExcel')

router.post('/upload-file', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum ficheiro carregado.' })
    }
    loadExcel(req.file.path).then(results => {
        res.status(201).json({ message: 'Ficheiro carregado e dados inseridos com sucesso!', results })

    }).catch(error => {
        res.status(500).json({ error });
    })
})

module.exports = router
