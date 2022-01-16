const LikeUnlike = require('../models/likes.models');
const mysql = require('mysql');


// intéragir avec les likes 
exports.addLike = (req,res) => {
    // Définir le constructeur
    const likeUnlike = new LikeUnlike({
        user_id: req.body.userId,
        post_id: req.body.articleId,
    
    });
    // Récupérer les avis d'un article
    LikeUnlike.findByArticleId(req.body.articleId)
    .then(() => {
        // si unlike
        if (!userId) {
            LikeUnlike.like(likeUnlike, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    console.log(data)
                    res.send(data);
                }
            })
        } else {
            // si like
            LikeUnlike.cancelLike(req.body.articleId, req.body.userId, (err, data) => {
                if(err) {
                    res.status(500).send({
                        message : err.message || "raté !"
                    });
                    res.send(data);
                }
            })
        } 
    })
    .catch(error => res.status(404).json({error: error | 'ça marche pas !'}))
}
