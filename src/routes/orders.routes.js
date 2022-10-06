/**
 * @author: ntwari egide
 * @description: orders routing  module
 */

const express = require('express');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
const { addPOOrder, GetDynamicFieldList, GetLocationList, GetPOOrderList, GetPOSizeTableTempList, GetMinExpectedDeliveryDaa, GetMinExpectedDeliveryDate, GetOrderDetail, SavePOOrder, GetPOOrderListPagination } = require('../microservices/order.microservice');
const { getApi } = require('../controller');
const { getDynamicFieldListValidation } = require('../validations/brand.validate');
const router = express.Router()
const {addPOOrderValidation, getMinExpectedDeliveryDateValidation, getOrderDetailValidation, getIconSequenceValidation, getPOOrderListValidation, getPOSizeTableTempListValidation, getLocationListValidation, savePOOrderValidation} = require('../validations/orders.validate')


router.route('/')
    .get( (req,res) => {
        console.log('reached out here .....');
        res.send('Welcome to orders endpoints')
    })

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: po orders apis are here
 */
router.route('/AddPOOrder')

/**
 * @swagger
 *  path:
 * /api/Order/AddPOOrder:
 *   post:
 *     summary: Check PO order and combination.
 *     description: Combine po orders of same option id and size matrix type, and sumarrize total qty of the same size for size content.
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_key:
 *                 type: string
 *                 description: brand key
 *                 example: e88d9b8e-44ed-4fc2-b9a0-aef31ca0ccf3
 *               order_user:
 *                 type: string
 *                 description: Login ID
 *                 example: innoa
 *               order_keys:
 *                 type: object
 *                 example: ["c13205a2-3c86-4e15-80b0-2aedbf0e8f04","7037c6a3-6ad0-42bb-81c5-fce8e7284f85"]
 *     responses:
 *       200:
 *         description: Check order passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         description: status
 *                         example: Success
 *                       status_description:
 *                         type: string
 *                         description: status description
 *                         example: dbb98fac-d44a-4e5f-add3-bfec01ef5499
 */
    .post( addPOOrderValidation, (req,res) => {

        const response = validationResult(req)

        if( Object.entries(response.errors).length !==0 ) return res.json({ message: 'Check your request, validation failed', errors: response.array()})

        addPOOrder(req.body.brand_key, req.body.order_user, req.body.order_keys)
             
                  
        res.json({
            message: 'Check PO order and combination.'
        })
    })

router.route('/GetMinExpectedDeliveryDate/brand-guid-key/:brand_guid_key/item-refs/:item_refs/erp-id/:erp_id')
    /**
 * @swagger
 * path:
 * /api/Order/GetMinExpectedDeliveryDate/brand-guid-key/{brand_guid_key}/item-refs/{item_refs}/erp-id/{erp_id}:
 *   post:
 *     summary: Return lead time of expected Delivery date.
 *     description: Return lead time of expected Delivery date.
 *     tags: [Orders]
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_guid_key : 
 *                 description: Brand primary Key
 *                 type: string
 *                 required: true
 * 
 *               item_refs : 
 *                 description: Item refs
 *                 type: array
 *                 items: 
 *                   type: string
 *                 required: true
 * 
 *               erp_id:
 *                 description: Erp id
 *                 type: string
 *                 required: true
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
 *                   lead_time:
 *                     type: string
 *                     example: 4
 *                   min_delivery_date:
 *                     type: string
 *                     example: 2022-04-26
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
    .post(getMinExpectedDeliveryDateValidation, async(req,res) => {

        const response = validationResult(req)

        console.log('body', req.body)
        // if (Object.entries(response.errors).length !== 0) return res.json({ message: 'Check your request, validation failed', errors: response.array() })

        
        let minExpectedDeliveryDate = await GetMinExpectedDeliveryDate(req.body.brand_guid_key, req.body.item_refs, req.body.erp_id)

        console.log("date", minExpectedDeliveryDate)

        res.json({
            message: 'Return lead time of expected Delivery date',
            data: minExpectedDeliveryDate
        })
    })

    router.route('/check')
    .get( (req,res) => {
        res.send('Welcome to check endpoints')
        
    } )

/**
 * @swagger
 * path:
 * /api/Order/GetOrderDetail:
 *   post:
 *     summary: Return order detail
 *     description: Return order detai
 *     tags: [Orders]
 *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
 *               brand_key:
 *                 description: Brand Key
 *                 type: string
 *                 required: true
 * 
 *               order_user:
 *                 description: Login ID
 *                 type: string
 *                 required: true
 * 
 *               order_no:
 *                 description: Multiple PO order keys
 *                 type: string
 *                 required: true
 * 
 *               is_po_order_temp:
 *                 description: 
 *                 type: string
 *                 required: true  
 *     responses:
 *       200:
 *         description: Success
 *         application/json:
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
 *                 status: 
 *                   example: Fail
 *                 status_description: 
 *                   example: error   
*/ 
router.route('/GetOrderDetail') 
    .post( getOrderDetailValidation, async(req,res) => {

        const response = validationResult(req)

        // if (Object.entries(response.errors).length !== 0) return res.json({ message: 'Check your request, validation failed', errors: response.array() })
        
        let orderDetail = await GetOrderDetail(req.body.brand_key, req.body.order_user, req.body.order_no, req.body.is_po_order_temp)

        res.json({
            message: 'Return order detail. Client double-click the order in the order listing go to the order form and show the order details',
            data: orderDetail
        })

    })

router.route('/GetPOOrderList')
    /**
 * @swagger
 * path:
 * /api/Order/GetPOOrderList:
 *   post:
 *     summary: Return PO Order List
 *     description: Return PO Order List
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *           schema: 
 *             type: object
 *             properties: 
 *               order_user:
 *                 description: Order user
 *                 type: string
 *                 required: true
 * 
 *               brand_key:
 *                 description: Brand key
 *                 type: string
 *                 required: true
 * 
 *               order_date_from:
 *                 description: Order date from
 *                 type: string
 * 
 *               order_date_to:
 *                 description: Order date to
 *                 type: string
 * 
 *               order_status:
 *                 description:  porder status
 *                 type: string
 * 
 *               factory_code:
 *                 description: factory code
 *                 type: string
 * 
 *               consolidated_id:
 *                 description: consilidated id
 *                 type: string
 * 
 *               order_no:
 *                 description: Order no
 *                 type: string
 *     responses:
 *       200:
 *         description: PO Order list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   order_user:
 *                     example: innoa
 *                     type: string
 *                   guid_key:
 *                     example: f7e48079-e8d5-4e7e-9c41-2a71a89db85a
 *                     type: string
 *                   order_no:
 *                     example: Wholesale010
 *                     type: string
 *                   brand_key:
 *                     example: e88d9b8e-44ed-4fc2-b9a0-aef31ca0ccf3
 *                     type: string
 *                  
 *                   total_qty:
 *                     example: 8
 *                     type: string
 *                  
 *                   consolidated_id:
 *                     type: string
 *                     example: 22332639
 *                   factory_code:
 *                     type: string
 *                     example: 9999
 *                   supplier_code:
 *                     example: 1100002473
 *                     type: string
 *                  
 *                   send_date:
 *                     type: string
 *                     example: 4/11/2022 4:01:07 PM
 * 
 *                   status_date:
 *                     type: string
 *                     example: 5/3/2022 12:00:00 AM
 *                   order_status:
 *                     type: string
 *                     example: Confirm
 *                   option_id:
 *                     type: string
 *                     example: 101346830
 *                   production_description:
 *                     type: string
 *                     example: Outerwear
 *                   po_last_update_time:
 *                     type: string
 *                     example: 06/04/2022
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
    .post( async (req,res) => {

        let poorderList = await GetPOOrderList(req.body)

        res.json({
            message: 'Return po order list...',
            data: poorderList
        })
    })

    // .post( getPOOrderListValidation, async(req,res) => {

    //     // const response = validationResult(req)

    //     // if (Object.entries(response.errors).length !== 0) return res.json({ message: 'Check your request, validation failed', errors: response.array() })

        
    //     let orderList = await GetPOOrderList(req.body.order_user, req.body.brand_key, req.body.order_date_from, req.body.order_date_to, req.body.order_status, req.body.factory_code, req.body.consolidated_id, req.body.order_no)

    //     console.log('orderList', orderList)

    //     res.json({
    //         message: 'Return po order list',
    //         data: orderList
    //     })
        
    // })

    router.route('/GetPOOrderStatus')
    /**
     * @swagger
     * path:
     * /api/Order/GetPOOrderStatus:
     *   get:
     *     summary: Return order detail
     *     description: Return order detai
     *     tags: [Orders]
     *     responses:
     *       200:
     *         description: Success
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
        .get((req, res) => {
            let status = [
                {
                "order_status": "COMPLETE",
                "status_id": 0
                },
                {
                "order_status": "New",
                "status_id": 2
                },
                {
                "order_status": "Revised",
                "status_id": 3
                }
               ]
               
            res.send({data : status})
        })

/**
 * @swagger
 * path:
 * /api/Order/GetPOSizeTableTempList/brand-key/{brand_key}/order-key/{order_key}/is-po-order-temp/{is_po_order_temp}:
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
 *       - in: path
 *         name: order_key
 *         description: Order key
 *         schema:
 *           type: string
 *         required: true
 * 
 *       - in: path
 *         name: is_po_order_temp
 *         description: is_po_order_temp
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
 *                 status: 
 *                   example: Fail
 *                 status_description: 
 *                   example: error   
*/  

router.route( '/GetPOSizeTableTempList/brand-key/:brand_key/order-key/:order_key/is-po-order-temp/:is_po_order_temp' )
    .get(getPOSizeTableTempListValidation,async (req,res) => {

        const response = validationResult(req)

        if (Object.entries(response.errors).length !== 0) return res.json({ message: 'Check your request, validation failed', errors: response.array() })
        
        let sizeTableTempList = await GetPOSizeTableTempList(req.params.brand_key, req.params.order_key, req.params.is_po_order_temp)

        res.json({
            message: 'Return multiple po size table list',
            data: sizeTableTempList
        })
        
    })

router.route('/GetLocationList')
    /**
 * @swagger
 * path:
 * /api/Order/GetLocationList:
 *   post:
 *     summary: Return Dynamic fields of Brand, limit 30 fields
 *     description: Return Dynamic fields of Brand, limit 30 fields
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               brand_key:
 *                 description: Brand primary Key
 *                 type: string
 *                 required: true
 * 
 *       
 *               order_no:
 *                 description: Order no
 *                 type: string
 *                 required: true
 * 
 *       
 *               order_user:
 *                 description: Login id
 *                 type: string
 *                 required: true
 * 

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
 *                    erp_id:
 *                      example: 8
 *                    erp_name:
 *                      example: HK
 *                    currency:
 *                      example: C-HK
 *                    default:
 *                      example: N
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
    .post( getLocationListValidation, async(req,res) => {
        // const response = validationResult(req)

        // if (Object.entries(response.errors).length !== 0) return res.json({ message: 'Check your request, validation failed', errors: response.array() })

        
        let locationList = await GetLocationList(req.body)

        res.json({
            message: 'Return ERP List of brand',
            data: locationList
        })
        
    })


router.route('/GetDynamicFieldList')
    /**
 * @swagger
 * path:
 * /api/Order/GetDynamicFieldList:
 *   post:
 *     summary: Return Dynamic fields of Brand, limit 30 fields
 *     description: Return Dynamic fields of Brand, limit 30 fields
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               brand_key:
 *                 description: Brand primary Key
 *                 type: string
 *                 required: true
 * 
 *               show_status:
 *                 description: Y,N, empty
 *                 type: string
 *                 required: true
 * 
 *               order_user:
 *                 description: Login id
 *                 type: string
 *                 required: true
 * 
 *               order_no:
 *                 description: Order no
 *                 type: string
 *                 required: true
 * 
 *       
 *               is_po_order_temp:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
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
    .post(getDynamicFieldListValidation, async(req, res) => {
        
        console.log('body', req.body)
        // const response = validationResult(req)
        
        // if (Object.entries(response.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: response.array() })
        
        let dynamicFieldList = await GetDynamicFieldList(req.body)

        res.json({
            message: 'Return Dynamic fields of Brand, limit 30 fields',
            data: dynamicFieldList
        })
    
    })


    router.route('/GetPOOrderListPagination')
    /**
 * @swagger
 * path:
 * /api/Order/GetPOOrderListPagination:
 *   post:
 *     summary: Return order list for the data range.
 *     description: Return order list for the data range.
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               order_user:
 *                 description: Brand primary Key
 *                 type: string
 *                 required: true
 * 
 *               brand_key:
 *                 description: Y,N, empty
 *                 type: string
 *                 required: true
 * 
 *               order_date_from:
 *                 description: Login id
 *                 type: string
 *                 required: true
 * 
 *               order_date_to:
 *                 description: Order no
 *                 type: string
 *                 required: true
 * 
 *       
 *               order_status:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
 * 
 *               factory_code:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
 * 
 *               consolidated_id:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
 * 
 *               page_index:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
*               page_size:
 *                 description: Distinguish po order
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
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
    .post( async(req, res) => {
        
        
        let poorderListPag = [
            [],
            []
          ]
        
        poorderList = GetPOOrderListPagination(req.body)

        res.json({
            message: 'Return order data by pagination query',
            data: poorderListPag
        })
    
    })


   


router.route('/SavepoOrder')
/**
 * @swagger
 *  path:
 * /api/Order/SavepoOrder:
 *   post:
 *     summary: Save Order
 *     description: Save Order
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               brand_key:
 *                 description: Brand primary Key
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Check order passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: array
 *                     properties:
 *                       status:
 *                         type: string
 *                         description: status
 *                         example: Success
 *                       status_description:
 *                         type: string
 *                         description: status description
 *                         example: dbb98fac-d44a-4e5f-add3-bfec01ef5499
 */
    .post( savePOOrderValidation, async (req,res) => {

        const response = validationResult(req)

         await SavePOOrder(req.body)

        // if( Object.entries(response.errors).length !==0 ) return res.json({ message: 'Check your request, validation failed', errors: response.array()})

        res.json({
            message: 'Saved Order',
            status_description: "Save successfully"
        })
    })

    .get( (req, res) => {
        async.parallel(
            {
              task1: async (callback) => {
                let result = await getApi("http://localhost:9998/items") 
                callback(null, result);
              },
              task2: async (callback) => {
                let result = await getApi("http://localhost:9999/customers")
                callback(null, result);
              },
            },
            (err, result) => {
              //console.log(result);
              let d = {
                d1: JSON.stringify(result.task1.data),
                d2: JSON.stringify(result.task2.data),
              };
              res.status(200).send(d);
            }
          );
    })

module.exports = router
