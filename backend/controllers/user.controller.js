const dbc = require("../config/db");
const db = dbc.getDB();


exports.getOneUser = (req, res, next) => {
    console.log("salut");
    const { id: userId } = req.params;
    const sqlGetUser = `SELECT * FROM users WHERE users.id = ${userId}`;
    db.query(sqlGetUser, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        delete result[0].user_password;
        res.status(200).json(result);
    });
};

exports.updateOneUser = (req, res, next) => {
    if (req.file) {
        const {id: user_id} = req.params
        let {destination, filename} = req.file
        destination = destination + filename

        const sqlInsertImage = `INSERT INTO images (post_id, user_id, image) VALUES (NULL, ${user_id}, "${destination}");`;
        db.query(sqlInsertImage, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
        });
    }

    const { user_pseudo } = req.body;
    const { id: userId } = req.params;
    const sqlUpdateUser = `UPDATE users SET pseudo = "${user_pseudo}" WHERE users.id = ${userId};`;
    db.query(sqlUpdateUser, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        if (result) {
            res.status(200).json(result);
        }
    });
};