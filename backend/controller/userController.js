const Joi = require("joi");
const joiPwdComplexity = require("joi-password-complexity");

const login = (req, res) => {
  const { error } = validateDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  res.status(200).send("login user");
};

const signup = (req, res) => {
  const { error } = validateDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  res.status(200).send("signup user");
};

function validateDetails(data) {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPwdComplexity().required(),
  });
  return joiSchema.validate(data);
}

module.exports = {login, signup}