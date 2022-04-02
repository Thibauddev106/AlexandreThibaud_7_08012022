const passwordValidator = require("password-validator");

const passwordFormat = new passwordValidator();

passwordFormat
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

module.exports = (req, res, next) => {
  if (!passwordFormat.validate(req.body.password)) {
    res.status(400).json({ error: "un mot de passe fort est demandé !" });
  } else {
    next();
  }
};
