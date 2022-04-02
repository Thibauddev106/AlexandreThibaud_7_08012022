const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

// Créer un nouveau commentaire ok
router.post("/createComment", auth, commentCtrl.createComment);

// Récupérer tous les commentaires d'un article ok
router.get("/comments/article/:post_id", auth, commentCtrl.findAllComments);

// Récupérer un commentare par son id ok
router.get("/:id", auth, commentCtrl.findCommentById);

// Mettre à jour un commentaire ok
router.put("/update/:id", auth, commentCtrl.updateComment);

// Effacer un commentaire ok
router.delete("/delete/:id", auth, commentCtrl.deleteOneComment);

module.exports = router;
