const mysql = require("mysql");
require("dotenv").config();

// connexion mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0226",
  database: "groupomania",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = connection;
