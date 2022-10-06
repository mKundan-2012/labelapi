/**
 * @author: ntwari egide
 * @description: translation routing module
 */

const express = require('express')
const { validationResult } = require('express-validator')
const { getDefaultContentByContentKey } = require('../microservices/content.microservice')
const { getCountryTranslationList } = require('../microservices/translation.microservice')
const { getCountryTranslationListValidation, getTranslationListValidation } = require('../validations/translation.validate')
const router = express.Router()

router.route('/')
    .get( (req, res) => {
        console.log("reached here ......" , req)
    })

/**
 * @swagger
 * tags:
 *   name: Translations
 *   description: translation apis here
 */

router.route('/GetCountryTranslationList/brand-key/:brand_key/page-type/:page_type/query-str/:query_str')
/**
 * @swagger
 * path:
 * /api/Translation/GetCountryTranslationList/brand-key/{brand_key}/page-type/{page_type}/query-str/{query_str}:
 *   get:
 *     summary: Return country list
 *     description: Return country list
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: page_type
 *         description: Page Type
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: query_str
 *         description: content number
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: query_str
 *         description: Login id
 *         schema:
 *           type: string
 *         required: true  
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   guid_key:
 *                     type: string
 *                     example: C935452C-830A-455D-B563-117FAF00BF59
 *                   gb_translation:
 *                     type: string
 *                     example: Made in Bangladesh
 *                   page_type:
 *                     type: string
 *                     example: country
 *                   ist_percentage:
 *                     type: string
 *                     example: null
 *                   icon_symbol:
 *                     type: string
 *                     example: null
 *                   icon_file:
 *                     type: string
 *                     example: null 
 *                      
 *              
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               example:
 *                 error: request timeout
 *                 error_description: sqlserver connection timeout   
*/
    .get( getCountryTranslationListValidation, async (req,res) => {
            const response = validationResult(req)

            if (Object.entries(response.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })

            let allcountry = await getCountryTranslationList(req.params.brand_key, req.params.page_type, req.params.query_str)

            res.json({
                message: 'Return country list',
                data: allcountry
            })
    })
   
router.route('/GetDefaultContentByContentKey/brand-key/:brand_key/cont-key/:content_key/page-type/:page_type')
    /**
 * @swagger
 * path:
 * /api/Translation/GetDefaultContentByContentKey/brand-key/{brand_key}/cont-key/{cont_key}/page-type/{page_type}:
 *   get:
 *     summary: Return Content Number List
 *     description: Return Content Number List
 *     tags: [Translations]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: cont_key
 *         description: content key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: page_type
 *         description: page type
 *         schema:
 *           type: string
 *         required: true
 * 
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   guid_key:
 *                     type: string
 *                     example: a8b80fca-c346-4f99-ba2b-8dcb6b9db131
 *                   gb_translation:
 *                     type: string
 *                     example: Contains non-textile parts of animal origin (Content)
 *                   page_type:
 *                     type: string
 *                     example: content
 *                   ist_percentage:
 *                     type: string
 *                   icon_symbol:
 *                     type: string
 *                   icon_file:
 *                     type: string
 * 
 *               
 *              
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 error: 
 *                   example: Fail
 *                 error_description: 
 *                   example: sqlserver connection timeout    
*/  
    .get(async (req,res) => {

        const response = validationResult(req)

        if( Object.entries( response.errors).length != 0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})

        const result = await getDefaultContentByContentKey(req.params.brand_key, req.params.content_key, req.params.page_type)

        res.json({
            message: 'Return Default content by content',
            data: result
        })

    })

router.route('/GetTranslationList')
/**
  * @swagger
  *  path:
  * /api/Translation/GetTranslationList:
  *   post:
  *     summary: GetTranslationList
  *     description: GetTranslationList
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               brand_key:
  *                 description: brand key
  *                 type: string
  *                 required: true
  * 
  *               page_type:
  *                 description: part, content, care, icon, country
  *                 type: string
  *                 required: true
  * 
  *               query_str:
  *                 description:  search value
  *                 type: string
  *                 required: true
  * 
  *               part_key:
  *                 description: part key
  *                 type: string
  *                 required: true
  * 
  *               icon_type_key:
  *                 description: Icon key
  *                 type: string
  *                 required: true
  * 
  *               product_line_key:
  *                 description:  search value
  *                 type: string
  *                 required: true
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Item Ref Detail
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                       guid_key:
  *                         type: string
  *                         example: CEC28C46-CA6E-467B-BD15-ED320124BD37
  *                       gb_translation:
  *                         type: string
  *                         example: Back of Fabric
  *                       page_type:
  *                         type: string
  *                         example: part
  *                       ist_percentage:
  *                         type: string
  *                         
  *                       icon_symbol:
  *                         type: string
  *                       icon_file:
  *                         type: string
  * 
  *       500:
  *         description: Fail Return
  *         content:
  *           application/json:
  *             schema: 
  *               type: object
  *               properties:
  *                 error: 
  *                   example: Fail
  *                 error_description: 
  *                   example: sqlserver connection timeout  
  * 
  * 
  * 
  * 
  */
 
    .post( getTranslationListValidation, (req,res) => {
        const response = validationResult(req)

        if( Object.entries( response.errors).length != 0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})

        res.json({
            message: 'Return Part / Content / Care / Icon (wash or footwear) / Country listing',
            data: req.params
        })
        
    })

module.exports = router