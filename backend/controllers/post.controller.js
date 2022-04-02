const Article = require("../models/post.models");
const mysql = require("mysql");
const fs = require("fs");

// Créer et sauver un article
exports.createArticle = (req, res, next) => {
  // Validation de requete
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide !",
    });
  }
  console.log(req.body);
  console.log(req.file);
  // Création d'un article
  const article = new Article({
    comment: req.body.comment,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    date_creation: req.body.date_creation,
    user_id: req.body.user_id,
  });
  console.log(article);
  // enregistrer dans la DB
  Article.create(article, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Des erreurs se sont produites !",
      });
    }
    res.send(data);
  });
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
  Article.deleteOne(req.params.articleId)
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
};

// Modifier un article
exports.modifyArticle = (req, res) => {
  let article = req.body;
  let articleId = req.params.articleId;
  Article.updateOne(articleId, article)
    .then(() => res.status(200).json({ message: "Article modifié !" }))
    .catch((error) => res.status(404).json({ error }));
};

// Récupérer tous les articles de tous les utilisateurs
exports.getArticles = (req, res) => {
  Article.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Des erreurs se sont produites",
      });
    }
    res.send(data);
  });
};

// Récupérer un article à partir de son id
exports.getOneArticle = (req, res) => {
  Article.findOne(req.params.id)
    .then((article) => res.status(200).json(article))
    .catch((error) => res.status(404).json({ error }));
};

//Récupérer tous les articles d'un utilisateur
exports.getArticlesOfOneUser = (req, res) => {
  Article.findAllByUser(req.params.user_id)
    .then((articles) => res.status(200).json(articles))
    .catch((error) => res.status(404).json({ error }));
};
