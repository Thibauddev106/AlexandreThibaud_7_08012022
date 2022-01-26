const jwt = require("jsonwebtoken");
const User = require("../models/user.models")
require("dotenv").config();
const SECRET_KEY = `${process.env.SECRET_KEY}`;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        const userId = decodedToken.id;
        const userName = decodedToken.pseudo;

        //Récupérer le pseudo utilisateur grace à l'id contenu dans le token
        User.findById(userId)
            .then(user => {
                let userPseudo = user[0].pseudo;
                // comparer le pseudo contenu dans le token (userName) avec (userPseudo)
                if (userName !== userPseudo || !token) {
                    throw "User ID non valable !";
                } else {
                    next();
                }
                console.log(userPseudo);
            })
            .catch(error => res.status(404).json({ error }));
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifié !" }); 
    } 
};

/*module.exports = (req, res, next) => {
    try {
        // on extrait le token de la requête  
        const token = req.headers.authorization.split(" ")[1];
        
        // on décode notre token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // on extrait l'ID utilisateur du token
        const userId = decodedToken.id;
        console.log("a")
        // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token
        if (req.body.id && req.body.id !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifié !"})
    }
};*/
