const util = require('util')
const db = require('../config/dbconfig')
const dbAll = util.promisify(db.all).bind(db)
const dbGet = util.promisify(db.get).bind(db)

class EscolaController {
    // Inserir escola
    static async insertEscola(req, res) {
        const { nome, email, salas, provincia } = req.body

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
            res.status(404).json({ error: `Erro do servidor ${error}` })
        }
    }

    // Atualizar escola
    static async updateEscola(req, res) {
        const id = req.params.id
        const { nome, email, salas, provincia } = req.body

        try {
            var emailMatch
            // Verifica se o email ja foi adicionado a uma outra escola
            const escolaEmail = await dbGet('SELECT * FROM escola WHERE email = ?', [email])
            if (escolaEmail) {
                emailMatch = email === escolaEmail.email && parseInt(id) === escolaEmail.id
            } else {
                emailMatch = true;
            }

            if (emailMatch) {
                const provincias = await dbGet('SELECT * FROM provincias WHERE nome=?', [provincia]) // Verifica se a provincia inserida e valida

                if (!provincias) {
                    return res.status(404).json({ error: 'Provincia invalida' })

                } else {
                    db.run('UPDATE escola SET nome=?, email=?, salas=?, provincia=? WHERE id=?', [nome, email, salas, provincia, id], function (err) {
                        if (err) {
                            console.log(err.message)
                            return res.status(404).json({ error: `Erro ao atualizar os dados ${err.message}` })
                        }
                    })
                    res.status(201).json({ message: `Dados atualizados com sucesso! id: ${id}` });
                }

            } else {
                res.status(404).json({ error: `O email adicionado pertence a uma outra escola` })
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: `Erro do servidor ${error}` })
        }
    }

    // Remover escola
    static async deleteEscola(req, res) {
        const id = req.params.id

        try {
            const escola = await dbGet('SELECT * FROM escola WHERE id=?', [id])
            if (!escola) {
                res.status(404).json({ error: 'Escola não encontrada' })

            } else {
                db.run('DELETE FROM escola WHERE id=?', [id], function (err) {
                    if (err) {
                        console.log(err.message)
                        res.status(404).json({ error: `Erro ao remover a escola ${err.message}` })
                    } else {
                        res.status(201).json({ message: 'Escola removida com sucesso!' })
                    }
                })
            }

        } catch (error) {
            console.log(error)
            res.status(404).json({ error: `Erro do servidor ${error}` })
        }
    }

    // Selecionar escolas
    static async selectEscolas(req, res) {
        try {
            const escolas = await dbAll('SELECT * FROM escola')
            res.status(201).json({ message: "Operação bem-sucedida", escolas: escolas })

        } catch (error) {
            console.error('Erro ao listar as escolas: ', error)
            res.status(404).json({ error: `Erro do servidor ${error}` })
        }
    }

    // Consultar uma escola pelo id
    static async selectEscola(req, res) {
        const id = req.params.id

        try {
            const escola = await dbGet('SELECT * FROM escola WHERE id=?', [id])
            if (!escola) {
                res.status(404).json({ error: 'Escola não encontrada' })

            } else {
                res.status(201).json({ message: "Operação bem-sucedida", escola: escola });
            }
        } catch (error) {
            console.log(error)
            res.status(404).json({ error: `Erro do servidor ${error}` })
        }
    }
}

module.exports = EscolaController