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

// Get usuarios
app.get('/usuarios', (req, res) => {
    execSqlQuery(`SELECT * FROM usuario`,
    res);
});

// Get by id
app.get('/usuarios/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID = '+
    parseInt(req.params.id);
    execSqlQuery(`SELECT * FROM usuario` + filter, res);
});

// POST
app.post('/usuarios', (req, res) => {
    nome = req.body.nome.substring(0,45),
    login = req.body.login.substring(0,45),
    senha = req.body.senha.substring(0,45),
    execSqlQuery(`INSERT INTO usuario (nome, login, senha) VALUES ('${nome}', '${login}', '${senha}' )`, res);
});


// Atualizar
app.put('/usuarios/:id?', (req, res) => {
    nome = req.body.nome.substring(0,45);
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`UPDATE usuario SET nome = '${nome}' ` + filter, res);
});

// Delete

app.delete('/usuarios/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE id = '+
    parseInt(req.params.id);
    execSqlQuery(`DELETE FROM usuario` + filter, res);
});