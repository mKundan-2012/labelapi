/**
 * @author: ntwari egide
 * @description: brand routing module
 */

const express = require('express')
const { validationResult } = require('express-validator')
const { GetPOBrandListByClient, GetWastageList } = require('../microservices/brand.microservice')
const { getDynamicFieldListValidation, getPOBrandListByClientValidation, getWastageListValidation } = require('../validations/brand.validate')
const {getContentNumberSettingValidaton} = require('../validations/contact.validate')
const router = express.Router()

router.route('/')
    .get( (req, res) => {
        console.log("reached here ......" , req)
    })

/**
 * @swagger
 * tags:
 *  name: Brands
 *  description: po brands apis are here
 */



/**
 * @swagger
 * path:
 * /api/Brand/GetPOBrandListByClient/brand_key/{brand_key}:
 *   get:
 *     summary: Return order detail
 *     description: Return order detai
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
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
 *                   show_status:
 *                     type: string
 *                     example: Y
 *                   wastage_value:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                           example: 3%
 *                         value: 
 *                           type: string
 *                           example: 0.05
 * 
 * 
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 status: 
 *                   example: Fail
 *                 status_description: 
 *                   example: error   
*/
router.route('/GetPOBrandListByClient/brand_key/:brand_key')
    .get( getPOBrandListByClientValidation, async (req,res) => {

        const response = validationResult(req)

        const result = await GetPOBrandListByClient(req.params.brand_key)
        // if( Object.entries( response.errors).length != 0 ) return res.send({ message: 'Check the parameter passed', erorrs: response.array()})
console.log(result,"resultresult")
        res.json({
            message: 'Return the po brand list.',
            data: result
        })
        
    })

/**
 * @swagger
 * path:
 * /api/Brand/GetWastageList/brand_key/{brand_key}:
 *   get:
 *     summary: Return order detail
 *     description: Return order detai
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
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
 *                   show_status:
 *                     type: string
 *                     example: Y
 *                   wastage_value:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                           example: 3%
 *                         value: 
 *                           type: string
 *                           example: 0.05
 * 
 * 
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 status: 
 *                   example: Fail
 *                 status_description: 
 *                   example: error   
*/
router.route('/GetWastageList/brand_key/:brand_key')
    .get( getWastageListValidation, async (req,res) => {
        
        const results = validationResult(req);

        let wastageList = await GetWastageList(req.params.brand_key)

        if( Object.entries(results.errors).length != 0 ) return res.send({ message: 'Check the parameters passed',errors: results.array()})

        res.json ({
            message: 'Return wastage list.',    
            data: wastageList   
        })

    })

module.exports = router