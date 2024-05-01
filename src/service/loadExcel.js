const XLSX = require('xlsx');
const EscolaController = require('../controller/escolaController')

function loadExcel(filePath) {
    return new Promise((resolve, reject) => {
        try {
            const workbook = XLSX.readFile(filePath)
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const data = XLSX.utils.sheet_to_json(sheet)
            const promises = []

            data.forEach((row) => {
                promises.push(new Promise((resolve, reject) => {
                    EscolaController.uploadEscola(row, (message, result) => {
                        if (message) {
                            return reject(message)
                        }
                        resolve(result)
                    })
                }))
            })

            Promise.all(promises).then(results => resolve(results)).catch(error => reject(error))

        } catch (err) {
            reject('Erro ao processar o ficheiro excel: ' + err)
        }
    })
}

module.exports = { loadExcel }