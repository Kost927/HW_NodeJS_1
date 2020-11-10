const errCatсher = require("../utils/errCatcher");
const UserModel = require("../users/users.modal");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const { createVarificationToken } = require("../services/token.service");
const avatarGenerator = require('../utils/avatarGenerator');
const { v4: uuidv4 } = require('uuid');
const { verificationSender } = require('../emailSender/emailSender');


const registerController = errCatсher(async (req, res, next) => {
  const verificationToken = uuidv4();
  const { body } = req;

  if (await UserModel.isExistUser(body.email)) {
    return res.status(409).json({
      message: `Email ${body.email} in use`,
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT));
  const newUser = await UserModel.createUser({
    ...body,
    password: hashedPassword,
    verificationToken,
  });
  
  const avatar = await avatarGenerator(newUser._id);
  const avatarURL = `http://localhost:${process.env.PORT}/images/${avatar}`;
  
  const updatedUser = await UserModel.updateUser(newUser._id, { avatarURL });
  await verificationSender(body.email, verificationToken);

  

  res.status(201).json({
    user: updatedUser
  });
});

const logInController = errCatсher(async (req, res, next) => {
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

const logOutController = errCatсher(async (req, res, next) => {
  res.cookie("token", null, { maxAge: 0, httpOnly: true });
  return res.sendStatus(204);
});

const verifyUser = errCatсher(async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log('verificationToken', verificationToken)
  const verifiedUser = await UserModel.updateUserToken(verificationToken);

  if (!verifiedUser) {
    return res.status(404).send({ message: `User not found` });
  }
   return res.json({
    status: 'success',
    user: verifiedUser,
  });
});

module.exports = {
  registerController,
  logInController,
  logOutController,
  verifyUser,
};
