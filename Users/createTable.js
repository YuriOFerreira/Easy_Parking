const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'bancoestacionamento'
});

connection.connect((err) => {
    if(err) return console.log(err);
    console.log('>>>>> Conectado <<<<<')
    createTable(connection);
    clienteCreateTable(connection);
    modeloVeiculoCreateTable(connection);
    veiculoCreateTable(connection);
    vagaCreateTable(connection);
    estacionamentoCreateTable(connection);
});

// USUARIO
function createTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS USUARIO(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        login VARCHAR(45) NOT NULL,
        senha VARCHAR(45) NOT NULL,
        CONSTRAINT unique_login_usuario UNIQUE(login));`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela USUáRIO criada');
    });

};

// CLIENTES
function clienteCreateTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS CLIENTE(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL,
        cpf VARCHAR(45) NOT NULL,
        CONSTRAINT unique_cpf_cliente UNIQUE(cpf));`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela CLIENTES criada');
    });

};

// MODELO VEÍCULO
function modeloVeiculoCreateTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS MODELO(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(45) NOT NULL);`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela MODELO VEÍCULO criada!');
    });

};

// VEICULOS
function veiculoCreateTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS VEICULO(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        placa VARCHAR(45) NOT NULL,
        cor VARCHAR(45) NOT NULL,
        cliente_id BIGINT(20),
        modelo_id BIGINT(20),
        CONSTRAINT unique_placa_veiculo UNIQUE(placa),
        FOREIGN KEY (modelo_id) REFERENCES modelo(id),
        FOREIGN KEY (cliente_id) REFERENCES cliente(id));`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela VEíCULO criada');
    });

};

// VAGA
function vagaCreateTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS VAGA(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        valor DECIMAL(10,2) NOT NULL,
        numVaga INT NOT NULL);`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela VAGA criada');
    });

};

// ESTACIONAMENTO
function estacionamentoCreateTable(conn) {
    const sql = `CREATE TABLE IF NOT EXISTS ESTACIONAMENTO(
        id BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
        entrada DATETIME NOT NULL,
        saida DATETIME NOT NULL,
        valor DECIMAL(10,2),
        veiculo_id BIGINT(20),
        vaga_id BIGINT(20),
        FOREIGN KEY (veiculo_id) REFERENCES veiculo(id),
        FOREIGN KEY (vaga_id) REFERENCES vaga(id));`;

    conn.query(sql, (error, results, fields) => {
    if(error) return console.log(error);

    console.log('Tabela ESTACIONAMENTO criada');
    });
};