const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

const User = require("../models/user.models");

// Création nouvel utilisateur
exports.register = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            image: req.body.image,
            password: hash,
            is_admin: req.body.is_admin
        })
        User.create(user, (err,data) => {
            if (err) {
                return res.status(401).json({ error: "Cet utilisateur existe déja"});
            }
            res.send(data);
        });
    })
    .catch(error => res.status(500).json({ error }));
};

// Connection d'un utilisateur existant
exports.login = (req, res) => {
    User.findOne(req.body.email, (err,data) => {
        if(!data) {
            return res.status(404).json({ error: "Utilisateur non trouvé"});
        };
        bcrypt.compare(req.body.password, data.password)
        .then(isValid => {
            if(!isValid) {
                return res.status(401).json({error: "Mot de passe incorect"})
            };
            const payload = {
                id: data.id,
                pseudo: data.pseudo,
                is_admin: data.is_admin
            }
            res.status(200).json({
                ...payload,
                token: jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    { expiresIn: "24h" }
                )
            })
        })
        .catch(error => res.status(500).json({ error }));
    });
};

// Vérification token login
exports.getMyDatas = (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token,process.env.SECRET_KEY);
    let id = JSON.parse(decodedToken.id);
    User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
    res.status(200).json({ message: "ok"});
};

// Modification des données utilisateur
exports.updateUser = (req, res) => {
    let user = (req.body);
    let userId = req.params.user_id;
    User.updateOne(userId, user)
    .then(() => res.status(200).json({ message: "Utilisateur modifié !"}))
    .catch(error => res.status(404).json({ error }));
};

// Trouver utilisateur par son id
exports.getOneUserById = (req, res) => {
    User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

// Trouver tous les utilisateurs
exports.getAllUsers = (req, res) => {
    User.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        res.send(data);
    });
};

// Suppression d'un utilisateur
exports.deleteUser = (req, res) => {
    User.deleteOne(req.params.id)
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !"}))
    .catch(error => res.status(404).json({ error }));
};