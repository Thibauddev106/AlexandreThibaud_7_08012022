const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/likes.controller");
//const auth = require("../middlewares/auth.middleware");
console.log("salut")
router.post("/react", likeCtrl.reacting);
//router.post("/postLikedByUser/:id", likeCtrl.postLikedByUser);
//router.post("/likeunlike/:id", likeCtrl.countLikes);

module.exports = router;