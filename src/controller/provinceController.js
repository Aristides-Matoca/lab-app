const fs = require('fs')
const path = require('path')
const db = require('../config/dbconfig')

function insertProvinces() {
    const jsonFilePath = path.join(__dirname, '../../province.json')

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err)
            return
        }

        const provinces = JSON.parse(data).Angola.Provincias
        const insertData = "INSERT INTO provincias (nome, capital) VALUES (?, ?)"

        db.serialize(() => {
            db.run("BEGIN TRANSACTION")
            provinces.forEach(province => {
                db.run(insertData, [province.nome, province.capital], err => {
                    if (err) {
                        console.error("Erro ao inserir dados:", err)
                    }
                })
            })
            db.run("COMMIT", err => {
                if (err) {
                    console.error("Erro ao finalizar transação:", err)
                } else {
                    console.log("Províncias inseridas com sucesso.")
                }
            })
        })
    })
}

module.exports = insertProvinces
