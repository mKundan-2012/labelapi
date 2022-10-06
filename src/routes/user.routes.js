/**
 * @author: km
 * @description: login
 */
const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");

const { sequelize } = require("../database/database");
// const { LoginApi } = require("../microservices/user.microservice");
const { logInValidate } = require("../validations/user.validate");
router.route("/login")
/**
  * @swagger
  *  path:
  * /api/user/login:
  *   post:
  *     summary: login.
  *     description: "user login"
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               guid_key:
  *                 description: Item No Primary key
  *                 type: string
  *                 required: true
  *     tags: [Users]
  *     responses:
  *       200:
  *         description: login
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  */
router.route("/login").post(logInValidate, async (req, res) => {
  const Users = sequelize.define("users", {
    email: Sequelize.TEXT,
    password: Sequelize.STRING,
  });
  sequelize.sync({ force: true }).then(() => {
    Users.bulkCreate([{ email: req.body.email, password:  req.body.password }])
      .then((data) => {
          res.json(data)
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //   const response = validationResult(req);
  //   await LoginApi(req.body);
  //   if (response.errors)
  //     return res.json({ message: "login failed", errors: "failed" });
  //   res.json({
  //     message: "Success",
  //     status_description: "Login successfully",
  //   });
});
module.exports = router;
