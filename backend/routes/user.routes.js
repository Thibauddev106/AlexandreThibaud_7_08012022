const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const userCtrl = require("../controllers/user.controller");
const validatePassword = require("../middlewares/validate-password");

// Création d'un utilisateur ok
router.post("/register", validatePassword, userCtrl.register);

// Connexion d'un utilisateur enregistrer ok
router.post("/login", userCtrl.login);

// Déconnexion de l'utilisateur ok
router.post("/logout", auth, userCtrl.logout);

// Retrouver tous les utilisateurs (admin) ok
router.get("/users", auth, userCtrl.getAllUsers);

// Trouver un utilisateur par son id ok
router.get("/:id", auth, userCtrl.getOneUserById);

//Modifier les données utilisateur ok
router.put("/update/:userId", auth, userCtrl.updateUser);

//Effacer un utilisateur (admin) ok
router.delete("/delete/:userId", auth, userCtrl.deleteUser);



module.exports = router;