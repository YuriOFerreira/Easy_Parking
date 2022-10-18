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

// Get Veiculos
app.get('/veiculos', (req, res) => {
    execSqlQuery(`SELECT * FROM veiculo`,
    res);
});

// Get by id
app.get('/veiculos/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM veiculo` + filter, res);
});

// POST
app.post('/veiculos', (req, res) => {
    placa = req.body.placa,
    cor = req.body.cor,
    cliente_id = req.body.cliente_id,
    modelo_id = req.body.modelo_id,
    execSqlQuery(`INSERT INTO veiculo (placa, cor, cliente_id, modelo_id) VALUES ('${placa}', '${cor}', '${cliente_id}', '${modelo_id}')`, res);
});

// Atualizar
app.put('/veiculos/:id?', (req, res) => {
    nome = req.body.nome.substring(0,45);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE veiculo SET nome = '${nome}' ` + filter, res);
});

// Delete
app.delete('/veiculos/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM veiculo` + filter, res);
});