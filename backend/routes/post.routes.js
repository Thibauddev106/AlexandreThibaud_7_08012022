const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");

// Création d'un article ok
router.post("/createArticle/", auth, postCtrl.createArticle);

// Suppression d'un article ok
router.delete("/article/delete/:articleId", auth, postCtrl.deleteArticle);

// Modification d'un article ok
router.put("/article/update/:articleId", auth, postCtrl.modifyArticle);

// Récupérer tous les articles ok
router.get("/articles", postCtrl.getArticles);

// Récupérer un article par son id ok
router.get("/article/:id", auth, postCtrl.getOneArticle);

// Récupérer tous les articles d'un utilisateur ok
router.get("/articles/user/:user_id", auth, postCtrl.getArticlesOfOneUser);


module.exports = router;
