const dbc = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { user_password: password } = req.body; 

        const salt = await bcrypt.genSalt(10);
        const passwordSalt = await bcrypt.hash(password, salt);

        const user = {
            ...req.body,
            user_password = passwordSalt,
        };
        const sql = "INSER INTO users SET ?";
        const db = dbc.getDB();
        db.query(sql, user, (err, result) => {
            if (!result) {
                res.status(200).json({ message: "Email dejà enregistré" });
            } else {
                res.status(201).json({ message: " Compte créer"});
            }  
        });
    } catch (err) {
        res.status(200).json({ message: "Echec de l'enregistrement", err});
    }
};

exports.login = async (req, res) => {
    // verifier si user exists dans DB
    const { user_email, user_password: clearPassword } = req.body;
    const sql = `SELECT id, pseudo, user_password, active FROM users WHERE email=?`;
    const db = dbc.getDB();
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(404).json({ err });
        }
        // verifier password avec hash dans DB
        if (results[0] && results[o].active ===1) {
            try {
                const { password: hashedPassword, id } = results[0];
                const match = await bcrypt.compare(clearPassword, hashedPassword);
                if (match) {
                    // si ca correspond alors on génère le token
                    res.status(200).json({
                        id,
                        token: jwt.sign({ id }, process.env.JWT_TOKEN, {
                            expiresIn: "24h",
                        })
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(400).json({ err });
            }
        } else if (results[0] &&  results[0].active === 0) {
            res.status(200).json({ 
                error: true,
                message: "votre compte a été désactivé",
            });
        } else if (!results[0]) {
            res.status.json({
                error: true,
                message: "erreur combinaison email / mot de passe"
            });    
        }
    });
};


exports.desactivateAccount = (req, res) => {
    const userId = req.params.id;
    const sql = `UPDATE users u SET active=0 WHERE u.id = ?`;
    const db = dbc.getDB();
    db.query(sql, userId, (err, results) => {
        if (err) {
            return res.status(404).json({ err });
        }
        res.status(200).json("DESACTIVATE");
    });
}