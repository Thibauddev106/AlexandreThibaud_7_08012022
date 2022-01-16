const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");

// Création d'un article
router.post("/createArticle/", auth, postCtrl.createArticle);

// Suppression d'un article
router.delete("/article/delete/:articleId", auth, postCtrl.deleteArticle);

// Modification d'un article
router.put("/article/update/:articleId", auth, postCtrl.modifyArticle);

// Récupérer tous les articles
router.get("/articles/", auth, postCtrl.getArticles);

// Récupérer tous les articles par date de création
//router.get("/article/:date_creation", auth, postCtrl.getArticlesByCreateDate);

// Récupérer un article par son id
router.get("/article/:id", auth, postCtrl.getOneArticle);

// Récupérer tous les articles d'un utilisateur
router.get("/articles/user/user_id", auth, postCtrl.getArticlesOfOneUser);


module.exports = router;
