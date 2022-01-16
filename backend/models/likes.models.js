const db = require("../config/db");
const mysql = require("mysql");

// Constructeur
const LikeUnlike = function(like) {
    this.user_id = like.userId,
    this.post_id = like.articleId
};

// Like un article
LikeUnlike.like = (newLike, result) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO likes SET ?", newLike,
            (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                result(null, {id: res.id, ...newLike});
            }
        )
    })
};

// Annuler un Like
LikeUnlike.cancelLike= (articleId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM likes WHERE post_id=${articleId} AND user_id=${userId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Trouver les avis d'un article
LikeUnlike.findByArticleId = (articleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM likes WHERE post_id=${articleId}`,
            function (error, result) {
                if (error) {
                    reject (error);
                } else {
                    resolve (result);
                }
            }
        )
    })
};

module.exports = LikeUnlike;
