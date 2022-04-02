const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/likes.controller");
const auth = require("../middlewares/auth.middleware");

console.log("salut");
router.patch("/likeunlike/:id", auth, likeCtrl.likeUnlikePost);
router.post("/postLikedByUser/:id", auth, likeCtrl.postLikedByUser);
router.post("/likeunlike/:id", auth, likeCtrl.countLikes);

module.exports = router;
