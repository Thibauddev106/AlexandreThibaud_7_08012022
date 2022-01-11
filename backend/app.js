const express = require("express");
const app = express();


// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    res.setHeader(
        "Acces-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Acces-Control-Allow-Credentials", "true");
    next();
});

app.use(express.json());


// fichier routes
const userRoutes = require("./routes/user.routes");

// routes
app.use("/api/user", userRoutes);





module.exports = app;