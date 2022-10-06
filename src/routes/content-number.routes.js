/**
 * @author: ntwari egide
 * @description: content number routing module
 */

 const { validationResult } = require('express-validator');
const express = require('express')
const { GetContentNumberDetail, getContentNumberSetting, getContentNumberList, matchMultiContentNumber, getIconSequence } = require('../microservices/content.microservice')
const {  getContentNumberListValidation,getContentNumberDetailValidation, getIconSequenceValidation, matchMultiContentNumberValidation, getContentNumberSettingValidaton } = require('../validations/contact.validate');
const { sequelize } = require("../database/database")

const router = express.Router()

router.route('/')
    .get( (req, res) => {
        console.log("reached here ......" , req)
    })

/**
 * @swagger
 * tags:
 *  name: ContentNumber
 *  description: content number apis are here
 */

router.route("/GetContentNumberDetail/brand-key/:brand_key/content-number-key/:content_number_key/order-user/:order_user/style-number/:style_number")
/**
 * @swagger
 * path:
 * /api/Contentnumber/GetContentNumberDetail/brand-key/{brand_key}/content-number-key/{content_number_key/order-user/{order_user}/style-number/{style_number}:
 *   get:
 *     summary: Return Content Number details
 *     description: Return Content Number detail, including content,care,icon,default content
 *     tags: [ContentNumber]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: content_number_key
 *         description: Content Number Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: style_number
 *         description: content number
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: order_user
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
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Return Content Number detail, including content,care,icon,default content
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       brandKey 
 *                      
 *              
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               example:
 *                 error: Fail
 *                 error_description: sqlserver connection timeout   
*/
    .get(getContentNumberDetailValidation, async (req,res) => {

        const validationResponse = validationResult(req)

        if(Object.entries(validationResponse.errors).length !=0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})

        let response = await GetContentNumberDetail(req.params.brand_key, req.params.content_number_key, req.params.order_user, req.params.style_number)

        res.json({
            message: 'Return Content Number detail, including content,care,icon,default content',
            data: response
        })
    })

router.route('/GetContentNumberList/brand-key/:brand_key/content-group/:content_group/query-str/:query_str/order-user/:order_user')
    /**
 * @swagger
 * path:
 * /api/Contentnumber/GetContentNumberList/brand-key/{brand_key}/content-group/{content_group}/query-str/{query_str}/order-user/{order_user}:
 *   get:
 *     summary: Return Content Number List
 *     description: Return Content Number List
 *     tags: [ContentNumber]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: content_group
 *         description: ABC,A,AB,C
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: query_str
 *         description: search value
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: order_user
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
 *                     example: C935452C-830A-455D-B563-117FAF00BF59
 *                   custom_number:
 *                     example: J2-BC-2016050002
 *                   style_number:
 *                     example: J2-BC-2016050002
 *                   user_id:
 *                     example: innoa
 *               
 *              
 *       500:
 *         description: Fail Return
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               example:
 *                 error: Fail
 *                 error_description: sqlserver connection timeout   
*/
   
    .get( getContentNumberListValidation, async (req,res) => {

        const validationResponse = validationResult(req)

        if(Object.entries(validationResponse.errors).length !=0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})

        const response = await getContentNumberList(req.params.brand_key, req.params.content_group, req.params.query_str, req.params.order_user)

        res.json({
            message: 'Return Content Number List',
            data: response
        })
    })


router.route('/GetIconSequence/brand-key/:brand_key/icon-group/:icon_group/icon-key/:icon_key')
    /**
 * @swagger
 * path:
 * /api/Contentnumber/GetIconSequence/brand-key/{brand_key}/icon-group/{icon_group}/icon-key/{icon_key}:
 *   get:
 *     summary: Return Content Number List
 *     description: Return Content Number List
 *     tags: [ContentNumber]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: icon_group
 *         description: A- Wash icon, B- footwear icon
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: icon_key
 *         description: content number key
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
 *                   sys_icon_key:
 *                     type: string
 *                     example: 
 *                   sys_icon_name:
 *                     type: string
 *                     example: Wash
 *                   en_descr:
 *                     type: string
 *                     example: 1
 *                   seq_no: 
 *                     type: string
 *                     example: 1
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
    .get( getIconSequenceValidation, async (req,res) => {
        const validationResponse = validationResult(req)

        // if(Object.entries(validationResponse.errors).length !=0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})


        let result = await getIconSequence(req.params.brand_key, req.params.icon_group, req.params.icon_key)

        res.json({
            message: 'Return wash / Footwear Icon sequence',
            data: result
        })
        
    })


    /**
 * @swagger
 * path:
 * /api/Contentnumber/MatchMultiContentNumber/brand-key/{brand_key}/order-user/{order_user}/content-group/{content_group}/content/part-key/{part_key}/cont-key/{cont_key}/percentage/:{percentage}/seqno/{seqno1}/default-content/cont-key/{cont_key1}/seqno/{seqno2}/care/care-key/{care_key}/seqno/icon/icon-key/{icon_key}/icon-type/{icon_type_id}/seqno/{seqno3}:
 *   get:
 *     summary: Return Content Number List
 *     description: Return Content Number List
 *     tags: [ContentNumber]
 *     parameters:
 *       - in: path
 *         name: brand_key
 *         description: Brand Key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: order_user
 *         schema:
 *           type: string
 *         required: false
 * 
 *       - in: path
 *         name: content_group
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: part_key
 *         schema:
 *           type: string
 *         required: false
 * 
*       - in: path
 *         name: cont_key
 *         schema:
 *           type: string
 *         required: false
 * 
 *       - in: path
 *         name: percentage
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: seqno1
 *         schema:
 *           type: string
 *         required: false
 * 
  *       - in: path
 *         name: cont_key1
 *         schema:
 *           type: string
 *         required: false
 * 
 *       - in: path
 *         name: seqno2
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: care_key
 *         schema:
 *           type: string
 *         required: false
 * 
*       - in: path
 *         name: icon_key
 *         schema:
 *           type: string
 *         required: false
 * 
 *       - in: path
 *         name: icon_type_id
 *         schema:
 *           type: string
 *         required: false
 *       - in: path
 *         name: seqno3
 *         schema:
 *           type: string
 *         required: false
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
 *                   sys_icon_key:
 *                     type: string
 *                     example: 
 *                   sys_icon_name:
 *                     type: string
 *                     example: Wash
 *                   en_descr:
 *                     type: string
 *                     example: 1
 *                   seq_no: 
 *                     type: string
 *                     example: 1
 *                   icon_symbol:
 *                     type: string
 *                   icon_file:
 *                     type: string
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
router.route('/MatchMultiContentNumber/brand-key/:brand_key?/order-user/:order_user?/content-group/:content_group?/content/part-key/:part_key?/cont-key/:cont_key?/percentage/:percentage?/seqno/:seqno1?/default-content/cont-key/:cont_key1?/seqno/:seqno2?/care/care-key/:care_key?/seqno/icon/icon-key/:icon_key?/icon-type/:icon_type_id?/seqno/:seqno3?')
    .get( matchMultiContentNumberValidation, async (req,res) => {

        const validationResponse = validationResult(req);
        
        // if (!validationResponse.isEmpty()) {
        //     return res.send({ message: 'Check the parameter passed', erorrs: validationResponse.array()})
        // }
    
        const result = await matchMultiContentNumber(req.params.brand_key, req.params.order_user, req.params.content_group, req.params.part_key, req.params.cont_key,req.params.percentage, req.params.seqno1, req.params.cont_key1, req.params.seqno2, req.params.care_key, req.params.icon_key, req.params.icon_type_id, req.params.seqno3)

        res.json({
            message: 'Return Content number & care number',
            data: result
        })
        
    })


    
 router.route('/GetContentNumberSetting/brand-key/:brand_key')
 /**
  * @swagger
  * path:
  * /api/Contentnumber/GetContentNumberSetting/brand-key/{brand_key}:
  *   get:
  *     summary: Return Content Number List
  *     description: Return Content Number List
  *     tags: [ContentNumber]
  *     parameters:
  *       - in: path
  *         name: brand_key
  *         description: Brand Key
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
  *                     example: a8b80fca-c346-4f99-ba2b-8dcb6b9db131
  *                   custom_number:
  *                     type: string
  *                     example: J2-BC-2016050002
  *                   style_number:
  *                     type: string
  *                     example: J2-BC-2016050002
  *                   user_id: 
  *                     example: innoa
  * 
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
     .get( getContentNumberSettingValidaton, async (req,res) => {
 
         const validationResponse = validationResult(req)
 
         if (Object.entries(validationResponse.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })
         
         const response = await getContentNumberSetting(req.params.brand_key)
         
         res.json({
             message: 'Return Content Number Setting of Brand',
             data: response
         })
 
     })
 
 

module.exports = router
