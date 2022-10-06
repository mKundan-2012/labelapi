/**
 * @author: ntwari egide
 * @description: translation validation module
 */

const { param } = require("express-validator");

const getCountryTranslationListValidation = [
    param("brand_key", "Brand key is required").isString().isLength({ max: 50}),
    param("page_type", "Page type is required").isString().isLength({ max: 50}),
    param("query_str", "GB translation is required").isString().isLength({ max: 50}),
]

const getDefaultContentByContentKeyValidaton = [
    param("brand_key","Brand key is required").isString().isLength({ max: 50 }),
    param("cont_key","content key is required").isString().isLength({ max: 50 }),
    param("page_type","page key is required").isString().isLength({ max: 50 })
]

const getTranslationListValidation = [
    param("brand_key","Brand key is required").isString().isLength({ max: 50 }),
    param("page_type","page type is required").isString().isLength({ max: 50 }),
    param("query_str","query string is required").isString().isLength({ max: 50 }),
    param("part_key","part key is required").isString().isLength({ max: 50 }),
    param("icon_type_key","icon type key is required").isString().isLength({ max: 50 }),
    param("product_line_key","product line key is required").isString().isLength({ max: 50 })

]

module.exports = {getCountryTranslationListValidation, getDefaultContentByContentKeyValidaton, getTranslationListValidation}