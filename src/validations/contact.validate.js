/**
 * @author: ntwari egide
 * @description: contact validation module
 */

const { param } = require("express-validator");

const getContentNumberDetailValidation = [
    param("brand_key", "Brand key is required").isString().isLength({max: 50}),
    param("content_number_key", "content number key is required").isString().isLength({max: 50}),
    param("style_number", "content number （system number) is required").isString().isLength({max: 50}),
    param("order_user", "Login ID is required").isString().isLength({max: 50})
]

const getContentNumberListValidation = [
    param("brand_key","Brand key is required").isString().isLength({ max: 50 }),
    param("content_group", "Content group is required").isString().isLength({ max: 50 }),
    param("query_str", "query string is required").isString().isLength({ max: 50 }),
    param("order_user", "Login ID is required").isString().isLength({ max: 50 })
]

const getContentNumberSettingValidaton = [
    param("brand_key","Brand Primary key is required").isString().isLength({max: 50})
]

const getIconSequenceValidation = [
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('icon_group', "Brand key is required, must be 50 characters").isString().isLength({ max: 1}),
    param('icon_key', "Icon key is required, must be 50 characters").isString().isLength({ max: 50}),
]

const matchMultiContentNumberValidation = [
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('order_user', "Login ID is required, must be 50 characters").isString().isLength({ max: 50}).optional(),
    param('order_user', "Login ID is required, must be 50 characters").isString().isLength({ max: 50}).optional(),
    param('conten_group', "Content model must be 50 characters").isString().isLength({ max: 50}).optional(),
    param('part_key', "part key must be 50 characters").isString().isLength({max: 50}).optional(),
    param('cont_key1', "content key is required, must be 50 characters").isString().isLength({max: 50}).optional(),
    param('percentage', "percentage must be 10 characters").isInt().isLength({max: 10}).optional(),
    param('seqno1', "seq no must be 10 characters").isInt().isLength({max: 10}).optional(),
    param('cont_key2', "content key must be 50 characters").isString().isLength({max: 50}).optional(),
    param('seqno2', "seq no must be 10 characters").isInt().isLength({max: 10}).optional(),
    param('care_key', "care key must be 50 characters").isString().isLength({max: 50}).optional(),
    param('seqno3', "seq no must be 10 characters").isInt().isLength({max: 10}).optional(),
    param('icon_key', "icon key must be 50 characters").isString().isLength({max: 50}).optional(),
    param('icon_type_id', "icon type id must be 50 characters").isString().isLength({max: 50}).optional(),
    param('icon_group', "icon group must be 50 characters").isString().isLength({max: 50}).optional(),
    param('seqno4', "seq no must be 10 characters").isInt().isLength({max: 10}).optional()
]

module.exports = {getContentNumberDetailValidation, getContentNumberListValidation, getContentNumberSettingValidaton, getIconSequenceValidation,matchMultiContentNumberValidation}