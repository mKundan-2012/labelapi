/**
 * @author: ntwari egide
 * @description: brand validation module
 */

const { param } = require("express-validator");

const getDynamicFieldListValidation = [
    param("brand_key","Brand key is required").isString().isLength({ max: 50}),
    param("show_status","Show status is required").isString().isLength({ max: 1}),
    param("order_user","Login ID is required").isString().isLength({ max: 50}),
    param("order_no","Order no is required").isString().isLength({ max: 50}),
    param("is_po_order_temp","Po order temp status is required").isString().isLength({ max: 50})
]

const getPOBrandListByClientValidation = [
    param("order_user","Brand key is required").isString()
]

const getWastageListValidation = [
    param("brand_key","Brand key is required, must be atmost  50 characters").isString().isLength({ max: 50 })
]


module.exports = { getDynamicFieldListValidation, getPOBrandListByClientValidation, getWastageListValidation}