const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = decodedToken.id;
    const userName = decodedToken.pseudo;

    //Récupérer le pseudo utilisateur grace à l'id contenu dans le token
    User.findById(userId)
      .then((user) => {
        let userPseudo = user[0].pseudo;
        // comparer le pseudo contenu dans le token (userName) avec (userPseudo)
        if (userName !== userPseudo || !token) {
          throw "User ID non valable !";
        } else {
          next();
        }
        console.log(userPseudo);
      })
      .catch((error) => res.status(404).json({ error }));
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifié !" });
  }
};
