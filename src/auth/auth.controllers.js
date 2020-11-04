const errCather = require("../utils/errCatcher");
const UserModel = require("../users/users.modal");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const { createVarificationToken } = require("../services/token.service");

const registerController = errCather(async (req, res, next) => {
  const { body } = req;

  if (await UserModel.isExistUser(body.email)) {
    return res.status(409).json({
      message: `Email ${body.email} in use`,
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT));

  const newUser = await UserModel.createUser({
    ...body,
    password: hashedPassword
  });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});

const logInController = errCather(async (req, res, next) => {
  const {
    body: { email, password }
  } = req;
  const user = await UserModel.findUser({ email });
  if (!user) {
    return res.status(401).send({ message: `Unauthorized` });
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password);
  if (!isPasswordEqual) {
    return res.status(401).send({ message: `Unauthorized` });
  }

  const token = await createVarificationToken({ id: user._id });

  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  return res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

const logOutController = errCather(async (req, res, next) => {
  res.cookie("token", null, { maxAge: 0, httpOnly: true });
  return res.sendStatus(204);
});

module.exports = {
  registerController,
  logInController,
  logOutController
};
