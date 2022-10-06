/**
 * @author:Kundan
 * @description: login
 */

const { param } = require("express-validator");

const logInValidate = [
    param("email", "Email is required").isString().isLength({ max: 50}),
    param("password", "Password is required").isString().isLength({ max: 50}),
]
module.exports = {logInValidate}