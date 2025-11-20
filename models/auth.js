const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minLength: [7, "THE MINIMUM password length is 7"],
    },
  },
  { timeStamps: true }
);

// hashPassword
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);

  return isCorrect;
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.name,
    },
    process.env.jwt_secret,
    { expiresIn: "1d" }
  );
};
module.exports = mongoose.model("User", userSchema);
