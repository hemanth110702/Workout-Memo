const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("no user with this email");
  try {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("incorrect password");
    return user;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });
  if (exists) throw new Error("Email already in use");

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
