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

// Get Vagas
app.get('/vagas', (req, res) => {
    execSqlQuery(`SELECT * FROM vaga`,
    res);
});

// Get by id
app.get('/vagas/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM vaga` + filter, res);
});

// POST
app.post('/vagas', (req, res) => {
    valor = req.body.valor,
    numVaga = req.body.numVaga,
    execSqlQuery(`INSERT INTO vaga (valor, numVaga) VALUES ('${valor}', '${numVaga}')`, res);
});

// Atualizar
app.put('/vagas/:id?', (req, res) => {
    valor = req.body.valor.decimal(10,2);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE veiculo SET nome = '${valor}' ` + filter, res);
});

// Delete
app.delete('/vagas/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM vaga` + filter, res);
});