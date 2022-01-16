const db = require("../config/db");
const mysql = require("mysql");


// Constructeur
const User = function(user) {
    this.pseudo = user.pseudo,
    this.email = user.email,
    this.password = user.password,
    this.is_admin = 0
};

// Création d'un utilisateur 
User.create = (newUser, result) => {
    db.query(
        "INSERT INTO users SET ?",
        newUser,
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {id: res.id, ...newUser});
        }
    );
};

// Supprimer un utilisateur 
User.deleteOne = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM users WHERE id=${userId}`,
            function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Trouver un utilisateur par son id 
User.findOne = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT FROM users WHERE id=${userId}`,
            function(err, result) {
                if (err) {
                    reject (err);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

// Trouver un utilisateur (login)
User.findOne = (email, result) => {
    db.query(
        "SELECT * FROM users WHERE email=?",
    email, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res[0]);
    });
};

// Mettre à jour les données d'un utilisateur
User.updateOne = (userId, user) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE users SET pseudo="${user.pseudo}", email="${user.email}", image="${user.image}", is_admin="${user.isAdmin}" WHERE id=${userId}`,
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        )
    })
};


module.exports = User;