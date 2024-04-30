const util = require('util')
const db = require('../config/dbconfig')
const dbAll = util.promisify(db.all).bind(db)
const dbGet = util.promisify(db.get).bind(db)

class EscolaController {
    // Inserir escola
    static async insertEscola(req, res) {
        const {nome, email, salas, provincia } = req.body
        
        try {
            const provincias = await dbGet('SELECT * FROM provincias WHERE nome=?', [provincia]) // Verifica se a provincia inserida e valida

            if (!provincias) {
                return res.status(404).json({ error: 'Provincia invalida' })
            } else {
                db.run('INSERT INTO escola (nome, email, salas, provincia) VALUES (?, ?, ?, ?)', [nome, email, salas, provincia], function (err) {
                    if (err) {
                        console.error(err.message)
                        return res.status(404).json({ error: `Erro ao inserir a escola ${err.message}` })
                    }
                    res.status(201).json({ message: `Escola inserida com sucesso id: ${this.lastID}` });
                })
            }
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }
    }

    // Atualizar escola
    static async updateEscola(req, res) {
        const { id, nome, email, salas, provincia } = req.body

        try {
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }
    }

    // Remover escola
    static deleteEscola(req, res) {
        const { id } = req.body

        try {
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }
    }

    // Selecionar escolas
    static selectEscolas(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }
    }

    // Consultar uma escola
    static selectEscola(req, res) {
        const { id } = req.body

        try {
            
        } catch (error) {
            console.log(error)
            res.status(401).json({ error: error })
        }
    }
}

module.exports = EscolaController