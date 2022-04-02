const Comment = require("../models/comments.models");
const mysql = require("mysql");

// Créer un nouveau commentaire
exports.createComment = (req, res) => {
  // validation de requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne doit pas être vide !",
    });
  }
  // Création d'un commentaire
  const comment = new Comment({
    comment: req.body.comment,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
    date_creation: req.body.date_creation,
  });
  // Sauvgarde dans la DB
  Comment.create(comment, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Des erreurs se sont produites !",
      });
    }
    res.send(data);
  });
};

// Récupérer tous les commentaires par l'id de l'article concerné
exports.findAllComments = (req, res) => {
  Comment.findAll(req.params.post_id)
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un commentaire
exports.updateComment = (req, res) => {
  let commentId = req.params.id;
  let comment = JSON.stringify(req.body.comment);
  Comment.updateOne(commentId, comment)
    .then(() => res.status(200).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un commentaire
exports.deleteOneComment = (req, res) => {
  Comment.deleteOneId(req.params.id)
    .then(() => res.status(200).json({ message: "Commentaire effacé !" }))
    .catch((error) => res.status(500).json({ error }));
};

// Trouver un commentaire par son id
exports.findCommentById = (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(500).json({ error }));
};
