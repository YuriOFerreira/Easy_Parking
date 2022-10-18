const express = require('express');
const app = express();

const port = 3000; // porta da aplicação

const mysql = require('mysql2');

app.use(express.json());

app.get('/', (req, res) => res.json({message: 'Funcionando' }));

//inicio serviço
app.listen(port);
console.log('API Funcionando');

function execSqlQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'bancoestacionamento'
    });

    connection.query(sqlQry, (error, results, fields) => {
        if(error)
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('Executou!');
    });
}

// Get modelos
app.get('/modelos', (req, res) => {
    execSqlQuery(`SELECT * FROM modelo`,
    res);
});

// Get by id
app.get('/modelos/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM modelo` + filter, res);
});

// POST ok
app.post('/modelos', (req, res) => {
    nome = req.body.nome.substring(0,45),
    execSqlQuery(`INSERT INTO modelo (nome) VALUES ('${nome}')`, res);
});

// Atualizar
app.put('/modelos/:id?', (req, res) => {
    nome = req.body.nome.substring(0,45);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE modelo SET nome = '${nome}' ` + filter, res);
});

// Delete
app.delete('/modelos/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM modelo` + filter, res);
});