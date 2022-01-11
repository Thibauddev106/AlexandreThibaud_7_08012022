const express = require("express");
const router = require("express").Router();

const userController = require("../controllers/user.controller");


// user
router.get("/:id", userController.getOneUser);

module.exports = router;