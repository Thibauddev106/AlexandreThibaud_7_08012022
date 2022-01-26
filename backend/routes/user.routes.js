const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const userCtrl = require("../controllers/user.controller");
const validatePassword = require("../middlewares/validate-password");

// Création d'un utilisateur
router.post("/register", validatePassword, userCtrl.register);

// Connexion d'un utilisateur enregistrer
router.post("/login", userCtrl.login);

// Déconnexion de l'utilisateur
router.get("/logout", auth, userCtrl.logout);

// Trouver un utilisateur par son id
router.get("/user/:id", userCtrl.getOneUserById);

// Retrouver tous les utilisateurs (admin)
router.get("/users", userCtrl.getAllUsers);

//Modifier les données utilisateur
router.put("/user/update/:userId", userCtrl.updateUser);

//Effacer un utilisateur (admin)
router.delete("/user/delete/:userId", userCtrl.deleteUser);



module.exports = router;