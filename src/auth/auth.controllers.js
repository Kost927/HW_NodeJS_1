const errCather = require("../utils/errCatcher");
const UserModel = require("../users/users.modal");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const registerController = errCather(async (req, res, next) => {
  const { body } = req;
  const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT));
  await UserModel.createUser({
    ...body,
    password: hashedPassword
  });
  res.status(201).send("created");
});

const logInController = errCather(async (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  const user = await UserModel.findUser({ email });
  if (!user) {
    return res.status(404).send(`User with such email: ${email} not found`);
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    return res.status(404).send(`Wrong password`);
  }
  res.json({
    email: user.email,
    id: user._id
  });
});

module.exports = {
  registerController,
  logInController
};
