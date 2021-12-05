const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Conexão com banco de dados SQLITE
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Conexão bem-sucedida com o banco de dados 'apptest.db'");
});

// Création de la table Livres (Livre_ID, Titre, Auteur, Commentaires)
const sql_hospede = `CREATE TABLE IF NOT EXISTS HOSPEDE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    cpf varchar(11) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(25),
    data_nascimento VARCHAR(10),
    endereco TEXT
);`;

const sql_quarto = `CREATE TABLE IF NOT EXISTS QUARTO (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL
);`;


const sql_admin = `CREATE TABLE IF NOT EXISTS ADMIN(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(100) NOT NULL,
    senha TEXT NOT NULL
);`;

const sql_hospedagem = `CREATE TABLE IF NOT EXISTS HOSPEDAGEM (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_hospede INTEGER,
    id_quarto INTEGER,
    data_inicio VARCHAR(15),
    data_fim VARCHAR(15),
    qtd_adultos INTEGER,
    qtd_criancas INTEGER,
    observacao TEXT,
    FOREIGN KEY(id_hospede) REFERENCES HOSPEDE(id),
    FOREIGN KEY(id_quarto) REFERENCES QUARTO(id)
);`;

db.run(sql_hospede, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Tabela 'HOSPEDE' criada com sucesso.");
    // Alimentation de la table
    const sql_insert = `INSERT INTO HOSPEDE (id, nome, sexo, cpf, email, telefone, data_nascimento, endereco) VALUES
    (1, 'Martin Gael Breno da Luz', 'Masculino', '00165432111', 'martin@gmail.com', '(94) 98399-5143', '29-04-1990', 'Rua 123; Casa 45 - CEP: 69077-456'),
    (2, 'Fátima Liz Eduarda', 'Feminino', '77931254287', 'jaquelinenicoledias_@vigaconstrucao.com.br', '(91) 2951-1285', '24-01-1987', 'Rua Dez 219; Casa 683 - CEP: 68515-974'),
    (3, 'Guilherme Luiz Henry Rocha', 'Masculino', '77464631773', 'guilhermeluizhenryrocha..guilhermeluizhenryrocha@sectron.com.br', '(96) 98127-4882', '11-03-1978', 'Rua Renato Russo; Casa 466 - CEP: 68909-149');`;
    db.run(sql_insert, err => {
        if (err) {
        return console.error('ERROR INSERT HOSPEDE: ' + err.message);
        }
        console.log("Dados de 'HOSPEDE' criados com sucesso");
    });
});

db.run(sql_quarto, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Tabela 'QUARTO' criada com sucesso.");
    // Alimentation de la table
    const sql_insert = `INSERT INTO QUARTO (id, titulo, descricao) VALUES
    (1, 'Quarto 71', 'Quarto da dona clotilde'),
    (2, 'Quarto 14', 'Quarto do Seu Madruga'),
    (3, 'Quarto 72', 'Quarto da Dona Florinda');`;
    db.run(sql_insert, err => {
        if (err) {
        return console.error('ERROR INSERT QUARTO: ' + err.message);
        }
        console.log("Dados de 'QUARTO' criados com sucesso");
    });
});

db.run(sql_admin, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Tabela 'ADMIN' criada com sucesso.");
    // Alimentation de la table
    const sql_insert = `INSERT INTO ADMIN (id, email, senha) VALUES
    (1, 'admin', 'q1w2e3r4');`;
    db.run(sql_insert, err => {
        if (err) {
        return console.error('ERROR INSERT ADMIN: ' + err.message);
        }
        console.log("Dados de 'ADMIN' criados com sucesso");
    });
});

db.run(sql_hospedagem, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Tabela 'HOSPEDAGEM' criada com sucesso.");
    // Alimentation de la table
    const sql_insert = `INSERT INTO HOSPEDAGEM (id, id_hospede, id_quarto, data_inicio, data_fim, qtd_adultos, qtd_criancas, observacao) VALUES
    (1, 1, 1, '01/01/2022', '15/01/2022', 2, 3, 'Nenhuma obsevação'),
    (2, 2, 2, '01/01/2022', '12/01/2022', 1, 2, 'Nenhuma obsevação'),
    (3, 3, 3, '03/01/2022', '12/01/2022', 2, 5, 'Nenhuma obsevação');`;
    db.run(sql_insert, err => {
        if (err) {
        return console.error('ERROR INSERT HOSPEDAGEM: ' + err.message);
        }
        console.log("Dados de 'HOSPEDAGEM' criados com sucesso");
    });
});
