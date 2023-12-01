const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = 3001;

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "passwordmanager",
  });

app.use(cors());
app.use(express.json());



app.post("/addpassword", (req, res) => {
    const { password, title } = req.body;
    try {
      const hashedPassword = encrypt(password);
      db.query(
        "INSERT INTO passwords (password, title, iv) VALUES (?,?,?)",
        [hashedPassword.password, title, hashedPassword.iv],
        (err, result) => {
          if (err) {
            console.error("Error adding password:", err);
            res.status(500).send("Internal Server Error");
          } else {
            res.status(200).send("Success");
          }
        }
      );
    } catch (error) {
      console.error("Encryption error:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.listen(PORT, () => {
  console.log("Server is running");
});