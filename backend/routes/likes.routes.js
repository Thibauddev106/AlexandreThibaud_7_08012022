const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/likes.controller");
const auth = require("../middlewares/auth.middleware");


router.post('/:articleId/like', auth, likeCtrl.addLike);

module.exports = router;