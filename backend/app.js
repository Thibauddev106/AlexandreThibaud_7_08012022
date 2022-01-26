const express = require("express");
const path = require("path");
require("dotenv").config();

// fichier routes
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/likes.routes");

const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Acces-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
//app.use("/api/auth", commentRoutes);
//app.use("/api/auth", likeRoutes);



module.exports = app;