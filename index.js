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

// Création de la table Livres (Livre_ID, Titre, Auteur, Commentaires)
// const sql_create = `CREATE TABLE IF NOT EXISTS Livres (
//   Livre_ID INTEGER PRIMARY KEY AUTOINCREMENT,
//   Titre VARCHAR(100) NOT NULL,
//   Auteur VARCHAR(100) NOT NULL,
//   Commentaires TEXT
// );`;
// db.run(sql_create, err => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Création réussie de la table 'Livres'");
//   // Alimentation de la table
//   const sql_insert = `INSERT INTO Livres (Livre_ID, Titre, Auteur, Commentaires) VALUES
//   (1, 'Mrs. Bridge', 'Evan S. Connell', 'Premier de la série'),
//   (2, 'Mr. Bridge', 'Evan S. Connell', 'Second de la série'),
//   (3, 'L''ingénue libertine', 'Colette', 'Minne + Les égarements de Minne');`;
//   db.run(sql_insert, err => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("Alimentation réussie de la table 'Livres'");
//   });
// });

// Iniciando o servidor
app.listen(3000, () => {
    console.log("Servidor iniciado (http://localhost:3000/) !");
});

// GET /
app.get("/", (req, res) => {
  // res.send("Bonjour le monde...");
  res.render("index");
});

app.get("/cadastro", (req, res) => {
  // res.send("Bonjour le monde...");
  res.render("cadastro_cliente");
});

// GET /about
app.get("/about", (req, res) => {
  res.render("about");
});

// GET /data
app.get("/data", (req, res) => {
  const test = {
    titre: "Test",
    items: ["un", "deux", "trois"]
  };
  res.render("data", { model: test });
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

// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
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
