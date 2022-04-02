const db = require("../config/db");
const mysql = require("mysql");

// Liker et unlike
exports.likeUnlikePost = (req, res) => {
  const { userId, postId } = req.body;
  db.query(
    `SELECT * FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(404).json({ err });
        throw err;
      }
      if (result.lenght === 0) {
        db.query(
          `INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId})`,
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else {
        db.query(
          `DELETE FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`,
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(404).json(err);
              throw err;
            }
            res.status(200).json(result);
          }
        );
      }
    }
  );
};

exports.postLikedByUser = (req, res) => {
  const { userId, postId } = req.body;
  db.query(
    `SELECT post_id, user_id FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};

exports.countLikes = (req, res) => {
  const { postId } = req.body;
  db.query(
    `SELECT COUNT(*) AS total FROM likes WHERE post_id = ${postId}`,
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(200).json(result);
    }
  );
};
