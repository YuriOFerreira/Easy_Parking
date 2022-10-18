const express = require('express');
const app = express();

const port = 3000; // porta da aplicação

const mysql = require('mysql2');

app.use(express.json());

app.get('/', (req, res) => res.json({message: 'Funcionado' }));

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

// Get Clientes
app.get('/clientes', (req, res) => {
    execSqlQuery(`SELECT * FROM cliente`,
    res);
});

// Get by id
app.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM cliente` + filter, res);
});

// POST ok
app.post('/clientes', (req, res) => {
    nome = req.body.nome.substring(0,45),
    cpf = req.body.cpf.substring(0,45),
    execSqlQuery(`INSERT INTO cliente (nome, cpf) VALUES ('${nome}', '${cpf}')`, res);
});

// Atualizar
app.put('/clientes/:id?', (req, res) => {
    nome = req.body.nome.substring(0,45);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE cliente SET nome = '${nome}' ` + filter, res);
});

// Delete
app.delete('/clientes/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM cliente` + filter, res);
});