const db = require("../config/db");
const mysql = require("mysql");

// Constructeur
const Comment = function (comment) {
    (this.comment = comment.comment),
    (this.user_id = comment.user_id),
    (this.post_id = comment.post_id),
    (this.date_creation = comment.date_creation);
};

// Création d'un commentaire
Comment.create = (newComment, result) => {
  db.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.id, ...newComment });
  });
};

// Chercher tous les commentaires d'un article
Comment.findAll = (articleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM comments WHERE post_id=${articleId}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Modifier un commentaire
Comment.updateOne = (commentId, comment) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE comments SET comment=${comment} WHERE id=${commentId}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Effacer un commentaire avec son id
Comment.deleteOneId = (commentId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM comments WHERE id=${commentId}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Trouver un commentaire par son id
Comment.findById = (commentId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM comments WHERE id=${commentId}`,
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = Comment;
