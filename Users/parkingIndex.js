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

// Get Estacionamento
app.get('/estacionamento', (req, res) => {
    execSqlQuery(`SELECT * FROM estacionamento`,
    res);
});

// Get by id
app.get('/estacionamento/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM estacionamento` + filter, res);
});

// POST
app.post('/estacionamento', (req, res) => {
    entrada = req.body.entrada,
    saida = req.body.saida,
    valor = req.body.valor,
    veiculo_id = req.body.veiculo_id,
    vaga_id = req.body.vaga_id,
    execSqlQuery(`INSERT INTO estacionamento (entrada, saida, valor, veiculo_id, vaga_id) VALUES ('${entrada}', '${saida}', '${valor}, '${veiculo_id}', '${vaga_id}')`, res);
});

// Atualizar
app.put('/estacionamento/:id?', (req, res) => {
    nome = req.body.nome.substring(0,45);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE estacionamento SET nome = '${nome}' ` + filter, res);
});

// Delete
app.delete('/estacionamento/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM estacionamento` + filter, res);
});