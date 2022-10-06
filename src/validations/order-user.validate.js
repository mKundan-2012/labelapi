/**
 * @author: ntwari egide
 * @description: order user validation module
 */

const { param } = require("express-validator");

const getClientDetailsValidation = [
    param("order_user","Logni ID, is required, must be 50 characters").isString().isLength({max: 50, min: 3})
]

const getClientAddressDetailValidation = [
    param("order_user","Logni ID, is required, must be 50 characters").isString().isLength({max: 50, min: 3}),
    param("address_type", "Adddress type must be 50 characters").isLength({max: 50}).optional(),
    param("address_id", "address id must be 50 characters").isLength({max: 50}).optional()
]


const getClientAddressListValidation = [
    param("order_user","Logni ID, is required, must be 50 characters").isString().isLength({max: 50, min: 3}),
    param("address_type", "Adddress type must be 50 characters").isLength({max: 50}).optional(),
]

module.exports = {getClientDetailsValidation,getClientAddressDetailValidation, getClientAddressListValidation}