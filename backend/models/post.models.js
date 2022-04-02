const db = require("../config/db");
const mysql = require("mysql");

// Constructeur
const Article = function (article) {
    (this.comment = article.comment),
    (this.image = article.image),
    (this.date_creation = article.date_creation),
    (this.user_id = article.user_id);
};

// Creation article ok
Article.create = (newArticle, result) => {
  db.query("INSERT INTO posts SET ?", newArticle, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.id, ...newArticle });
  });
};

// Effacer un article par son Id
Article.deleteOne = (articleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM posts WHERE id="${articleId}"`,
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

// Modification d'un article ok
Article.updateOne = (articleId, article) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE posts SET comment="${article.comment}", image="${article.image}" WHERE id="${articleId}"`,
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

// Chercher tous les articles ok
Article.findAll = (result) => {
  db.query(
    "SELECT posts.id, posts.comment, posts.image, users.pseudo, posts.date_creation FROM posts JOIN users ON users.id=posts.user_id ORDER BY posts.date_creation DESC",
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        result(null, { articles: res });
      }
    }
  );
};

// Chercher un article par son id ok
Article.findOne = (articleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM posts WHERE id="${articleId}"`,
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Chercher tous les articles d'un auteur en particulier
Article.findAllByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM posts WHERE user_id=${user_id}`,
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = Article;
