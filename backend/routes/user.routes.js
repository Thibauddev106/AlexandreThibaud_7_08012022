const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const userCtrl = require("../controllers/user.controller");
const validatePassword = require("../middlewares/validate-password");

// Création d'un utilisateur
router.post("/register/", validatePassword, userCtrl.register);

// Connection d'un utilisateur enregistrer
router.post("/login/", userCtrl.login);

// Déconnection de l'utilisateur
router.post("/logout", auth, userCtrl.logout);

// Trouver un utilisateur par son id
router.get("/user/:id", auth, userCtrl.getOneUserById);

// Retrouver tous les utilisateurs (admin)
router.get("/users/", auth, userCtrl.getAllUsers);

//Modifier les données utilisateur
router.put("/user/update/:userId", auth, userCtrl.updateUser);

//Effacer un utilisateur (admin)
router.delete("/user/update/:userId", auth, userCtrl.deleteUser);



module.exports = router;