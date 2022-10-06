/**
 * @author: ntwari egide
 * @description: Item validation module
 */

const { param } = require("express-validator");

const getItemRefDetailValidation = [
    param("guid_key", "Item No primary key").isString().isLength({ max: 50 })
]

const getItemListValidation = [
    param("order_user", "Login ID is required").isString().isLength({ max: 50}),
    param("brand_key","Brand key is required").isString().isLength({ max: 50}),
    param("item_ref","Item ref or item code is required").isString().isLength({ max: 50}),
    param("item_ref_type","item type is required").isString().isLength({ max: 50})
]

module.exports = { getItemRefDetailValidation, getItemListValidation}