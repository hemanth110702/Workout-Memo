const Joi = require("joi");
const joiPwdComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" } );
};

const login = async (req, res) => {
  const { error } = validateDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const { email, password } = req.body;
    const { error, user } = await User.login(email, password);
    if (error.isError) {
      return res.status(400).send(error.message);
    }
    const token = createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

const signup = async (req, res) => {
  const { error } = validateDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const { email, password } = req.body;
    const user = await User.signup(email, password);

    const token = await createToken(user._id);
    return res.status(200).json({ email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

function validateDetails(data) {
  const joiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPwdComplexity().required(),
  });
  return joiSchema.validate(data);
}

module.exports = { login, signup };
