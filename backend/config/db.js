const mysql = require("mysql");

// connexion mysql
const db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "0226",
    database : "groupomania"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });

module.exports.getDB = () => {
    return db
};