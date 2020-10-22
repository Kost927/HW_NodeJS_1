const errCather = require("../utils/errCatcher");
const UserModel = require('../users/users.modal');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const registerController = errCather(async (req, res, next) => {
  const { body } = req
  const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALT))
  await UserModel.createUser({
    ...body,
    password: hashedPassword
  })
    res.status(201).send("created");

})

module.exports = {
  registerController
}

