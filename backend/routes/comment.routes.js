const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment.controller")
const auth = require("../middlewares/auth.middleware");

// Créer un nouveau commentaire
router.post("/createComment/", auth, commentCtrl.createComment);

// Récupérer tous les commentaires d'un article
router.get("/comments/article/:post_id", commentCtrl.findAllComments);

// Récupérer un commentare par son id
router.get("/comment/:id", auth, commentCtrl.findCommentById);

// Mettre à jour un commentaire
router.put("/comment/update/id", auth, commentCtrl.updateComment);

// Effacer un commentaire 
router.delete("/comment/delete/id", auth, commentCtrl.deleteOneComment);

module.exports = router;