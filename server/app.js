const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
// const sqlInsert =
// "INSERT INTO recipies ( name, text, nameAuthor, timeCreate) values ('NazwaTest', 'Opis brak', 'AutorBrak','CzasUtworzenia')";
// db.query(sqlInsert, (err, result) => {
// res.send("Hello word");
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `uploads/${file.originalname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: storage,
});
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  passowrd: "password",
  database: "przepisy",
});

app.get("/recipies", (req, res) => {
  db.query("SELECT * FROM recipies", (err, result) => {
    if (err) {
      res.send({ error: "Error from serwer" });
    }

    if (result) {
      res.send(result);
    }
  });
});

app.post("/create", upload.single("image"), (req, res) => {
  const { name, nameAuthor, timeCreate, type, dificulty, text, ingredients } =
    req.body;

  const sqlInsert =
    "INSERT INTO recipies ( name, text, nameAuthor, timeCreate,type,dificulty,ingredients) values (?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [name, text, nameAuthor, timeCreate, type, dificulty, ingredients],
    (err, result) => {
      if (err) {
        res.send({ error: "Error from serwer" });
      }

      if (result) {
        res.send({ success: "Zapisano" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const sqlInsert = "INSERT INTO users ( name, email, password) VALUES (?,?,?)";
  db.query(sqlInsert, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ error: "Error from serwer" });
    }
    if (result) {
      res.send({ success: "Zapisano" });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ error: "Error from serwer" });
      }

      if (result.length > 0) {
        res.send(result);
        console.log(result);
      } else {
        res.status(400).send({ message: "Zly email lub haslo" });
        console.log(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query(
    "DELETE FROM recipies WHERE id_recipies = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("runing on port 3001");
});
