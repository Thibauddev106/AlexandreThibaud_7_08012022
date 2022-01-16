const passwordValidator = require("password-validator");

const passwordFormat = new passwordValidator();

passwordFormat
.is().min(8)
.is().max(50)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().not().spaces()

module.exports = (req, res) => {
    if (passwordFormat.validate(req.body.password)) {
        next();
    } else {
        res.status(400).json({error: "un mot de passe fort est demandé !"});
    }
};