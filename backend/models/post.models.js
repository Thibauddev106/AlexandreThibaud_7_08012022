const db = require("../config/db");
const mysql = require("mysql");

// Constructeur
const Article = function(article) {
    this.body = article.body,
    this.image = article.image,
    this.user_id = article.user_id
};

// Creation article ok
Article.create = (newArticle, result) => {
    db.query(
        "INSERT INTO posts SET ?",
        newArticle, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, {id: res.id, ...newArticle});
        }
    );
};

// Effacer un article par son Id
Article.deleteOne = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM posts WHERE id=${articleId}`),
        function(err, result) {
            if (err) {
                reject(err);
            } else {
            resolve (result);
            }
        }
    });
};

// Modification d'un article ok
Article.updateOne = (articleId, article) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE posts SET  body="${article.body}", image="${article.image}", WHERE id="${articleId}`,
            function(err, result) {
                if (err) {
                    reject(err);
                } else {
                resolve (result);
                }
            }
        )
    });
};

// Chercher tous les articles ok
Article.findAll = (result) => {
    db.query(
        "SELECT * FROM posts", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, {articles: res});
            }
        }
    )
};

// Chercher un article par son id ok
Article.findone = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT a.id AS articleId, a.user_id AS user_id, a.title AS title, a.body AS body, a.image AS image, a.date_creation AS date_creation, 
            SUM(l.likes) AS likeCount FROM posts a, likes l WHERE a.id=${articleId} AND l.article_id = a.id`,
            function(err, result, fields) {
                if (err) {
                    reject (err);
                } else {
                    resolve (result);
                }
            }
        )
    })
};


module.exports = Article;
