const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('escolas.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('SQLite conectado com sucesso!!!')
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS escola (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT CHECK(LENGTH(nome) <= 50) NOT NULL,
        email TEXT CHECK(email LIKE '%@%.%' AND email LIKE '_%@%._%') NOT NULL UNIQUE,
        salas INTEGER NOT NULL,
        provincia TEXT NOT NULL,
        data DATE DEFAULT (DATE('now'))
    )`, err => {
        if (err) {
            console.error("Erro ao criar tabela escola:", err);
        }
    });

    db.run("CREATE TABLE IF NOT EXISTS provincias (nome TEXT, capital TEXT)", err => {
        if (err) {
            console.error("Erro ao criar a tabela provincias:", err);
        }
    })
})

module.exports = db