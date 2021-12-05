const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// Configuração do server
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Conexão com banco de dados SQLITE
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Conexão bem-sucedida com o banco de dados 'apptest.db'");
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado (http://localhost:3000/) !");
});

// GET /
app.get("/", (req, res) => {
  res.render("index");
});

// GET /
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/logar", (req, res) => {
  res.redirect("/hospedes");
});

// GET /Hospedes
app.get("/hospedes", (req, res) => {
  const sql = "SELECT * FROM HOSPEDE ORDER BY id";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("hospedes", { hospedes: rows });
  });
});

// POST /create
app.post("/create-hospede", (req, res) => {
  const sql = "INSERT INTO HOSPEDE (nome, sexo, cpf, email, telefone, data_nascimento, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const hospede = [req.body.nome, req.body.sexo, req.body.cpf, req.body.email, req.body.telefone, req.body.data_nascimento, req.body.endereco];
  db.run(sql, hospede, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/");
  });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Livres (Titre, Auteur, Commentaires) VALUES (?, ?, ?)";
  const book = [req.body.Titre, req.body.Auteur, req.body.Commentaires];
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/livres");
  });
});

// GET /edit/5
app.get("/edit-hospede/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM HOSPEDE WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit_hospede", { hospede: row });
  });
});

// POST /edit/5
app.post("/edit-hospede/:id", (req, res) => {
  const id = req.params.id;
  const hospede = [req.body.nome, req.body.sexo, req.body.cpf,req.body.email,req.body.telefone,req.body.data_nascimento,req.body.endereco, id];
  const sql = "UPDATE HOSPEDE SET nome = ?, sexo = ?, cpf = ?, email = ?, telefone = ?, data_nascimento = ?, endereco = ? WHERE (id = ?)";
  db.run(sql, hospede, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/hospedes");
  });
});

// GET /delete-hospede/5
app.get("/delete-hospede/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM HOSPEDE WHERE id = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("delete_hospede", { hospede: row });
  });
});

// POST /delete-hospede/5
app.post("/delete-hospede/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM HOSPEDE WHERE id = ?";
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/hospedes");
  });
});

// GET /Hospedagens
app.post("/create-reserva", (req, res) => {
  const sql = "INSERT INTO HOSPEDAGEM (id_hospede, id_quarto, data_inicio, data_fim, qtd_adultos, qtd_criancas, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const hospede = [req.body.id_hospede, req.body.id_quarto, req.body.data_inicio, req.body.data_fim, req.body.qtd_adultos, req.body.qtd_criancas, req.body.observacao];
  db.run(sql, hospede, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/");
  });
});

app.get("/hospedagens", (req, res) => {
  const sql = `SELECT q.titulo as titulo, h.nome as nome, strftime('%d/%m/%Y', data_inicio) as data_inicio, strftime('%d/%m/%Y', data_fim) as data_fim, status, hp.id as id FROM HOSPEDAGEM AS hp 
  INNER JOIN HOSPEDE AS h ON h.id = hp.id_hospede 
  INNER JOIN QUARTO AS q ON q.id = hp.id_quarto ORDER BY hp.id`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("hospedagens", { hospedagens: rows });
  });
});

// GET /edit/5
app.get("/detail-hospedagem/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT q.titulo as titulo, h.nome as nome, h.email as email, id_hospede, id_quarto, data_inicio, data_fim, qtd_criancas, qtd_adultos, status, hp.id as id FROM HOSPEDAGEM AS hp 
  INNER JOIN HOSPEDE AS h ON h.id = hp.id_hospede 
  INNER JOIN QUARTO AS q ON q.id = hp.id_quarto WHERE hp.id = ?`;
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("detail_hospedagem", { hospedagem: row });
  });
});

// POST /edit/5
app.post("/edit-hospedagem/:id", (req, res) => {
  const id = req.params.id;
  const hospedagem = [req.body.id_hospede, req.body.id_quarto, req.body.data_inicio, req.body.data_fim, req.body.qtd_adultos, req.body.qtd_criancas, req.body.status,  id];
  const sql = "UPDATE HOSPEDAGEM SET id_hospede = ?, id_quarto = ?, data_inicio = ?, data_fim = ?, qtd_adultos = ?, qtd_criancas = ?, status = ? WHERE (id = ?)";
  db.run(sql, hospedagem, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/hospedagens");
  });
});