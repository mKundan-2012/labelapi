/**
 * @author: ntwari egide
 * @description: item routing module
 */

 const express = require('express')
 const { validationResult } = require('express-validator')
const { getItemRefDetailValidation, getItemListValidation } = require('../validations/items.validate')
 const { getItem, insertItem, updateItem, deleteItem, GetItemRefDetail, GetItemList, GetItemTypeList} = require('../microservices/item.microservice')
const router = express.Router()
 
const { sequelize } = require("../database/database")
 
 router.route('/')
     .get( (req, res) => {
         console.log("reached here ......" , req)
     })
 
 /**
  * @swagger
  * tags:
  *  name: Items
  *  description: PO Items apis are here
  */
 
 
 router.route('/GetItemRefDetail/guid-key/:guid_key')
 /**
  * @swagger
  *  path:
  * /api/Item/GetItemRefDetail/guid-key/{guid_key}:
  *   post:
  *     summary: Search Item No Detail Data.
  *     description: Search Item No Detail Data
  *     requestBody:
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               guid_key:
  *                 description: Item No Primary key
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
  *                         example: 204681f9-c63a-435c-96e9-e6838ed56775
  *                       item_ref:
  *                         type: string
  *                         example: EB-SIL-002 (RM# T5323)
  *                       item_ref_type:
  *                         type: string
  *                         example: Trim Labe
  *                       brand_key:
  *                         type: string
  *                         example: EDDIE BAUER
  *                       brand_name:
  *                         type: string
  *                         example: 204681f9-c63a-435c-96e9-e6838ed56775
  *                       item_code:
  *                         type: string
  *                         example: 
  *                       layout_file:
  *                         type: string
  *                         example: 
  *                       item_ref_desc:
  *                         type: string
  *                         example: 70 mm x 10 mm Eddie Bauer script logo in raised silicone ink
  *                       item_tag_guid_key:
  *                         type: string
  *                         example: 41
  *                       wastage:
  *                         type: string
  *                         example: 
  *                       is_non_size:
  *                         type: string
  *                         example: Y
  *                       has_qr:
  *                         type: string
  *                         example:
  *                       enable_print:
  *                         type: string
  *                         example:
  *                       aw_excel_model:
  *                         type: string
  *                         example:
  *                       country_quantity:
  *                         type: string
  *                         example: 9
  *                       is_care_index:
  *                         type: string
  *                         example: N
  *                       item_status:
  *                         type: string
  *                         example: --Select--
  *                       moq_nonsize:
  *                         type: string
  *                         example: Per Order
  *                       is_modify:
  *                         type: string
  *                         example:
  *                       erp_item_code:
  *                         type: string
  *                         example:
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
 
     .post( getItemRefDetailValidation, async(req,res) => {
        
        //  const result = validationResult(req)
 
        //  if(Object.entries( result.errors).length !=0 ) return res.send({ message: 'Check the parameter passed', erorrs: errors.array()})
 
         let itemRefDetail = await GetItemRefDetail(req.body.guid_key)
         res.json({
             message: 'Search Item No Detail Data',
             data: itemRefDetail
         })
 
     })
     
 
 
 /**
  * @swagger
  *  path:
  * /api/Item/GetItemList/order-user/{order_user}/brand-key/{brand_key}/item-ref/{item_ref}/item-ref-type/{item_ref_type}:
  *   get:
  *     summary: Return Item listing with Brand / Item Code / Item Name / Item Type search..
  *     description: Returns all item refs under the user associated brand, If one of the search conditions is met, the query conditions are as follows, If the query condition has no value, all data is returned
  *     parameters:
  *       - in: path
  *         name: order_user
  *         description: Login ID
  *         schema:
  *           type: String
  *       - in: path
  *         name: brand_key
  *         description: brand key
  *         schema: 
  *           type: String
  *       - in: path
  *         name: item_ref
  *         description: Item Ref
  *         schema: 
  *          type: String
  *       - in: path
  *         name: item_ref_type
  *         description: Item Ref Type
  *         schema: 
  *          type: String
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Check order passed
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                  type: String
  *                  example: Return Item listing with Brand / Item Code / Item Name / Item Type search
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       brand_key:
  *                         type: string
  *                         description: brand key
  *                         example: 27c29b88-2c34-4de3-95a7-af2cd4ee9223
  *                       brand_name:
  *                         type: String
  *                         description: Brand Name
  *                         example:  ADIDAS (TRIMS)
  *                       guid_key:
  *                         type: String
  *                         description: Item ref key
  *                         example: 63b1ab07-5af6-4822-b86a-93a0b450fb6d
  *                       item_ref:
  *                         type: String
  *                         description: Item ref
  *                         example:  ADI-FW19-002-OptionA
  *                       item_ref_type:
  *                         type: String
  *                         description: Item ref type
  *                         example:  Woven Label
  *                       item_ref_desc:
  *                         type: String
  *                         description: Description
  *                         example:  FW19 Adidas Tango Lock Up Logo Label - Woven Base with Reverse Raised Print, Flat Print & Sew Down
  *                       layout_file:
  *                         type: String
  *                         description: Layout File
  *                         example:  
  *                       item_code:
  *                         type: String
  *                         description: D365 Item Code
  *                         example: 
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
 
 router.route('/GetItemList/order-user/:order_user/brand-key/:brand_key/item-ref/:item_ref/item-ref-type/:item_ref_type')
     .get( getItemListValidation, async (req,res) => {
 
         const result = validationResult(req)
 
         if (Object.entries(result.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })

         await GetItemList(req.params.order_user, req.params.brand_key, req.params.item_ref, req.params.item_ref_type)
             .then(data => {
                
                 res.json({
                     message: 'Return Item listing with Brand / Item Code / Item Name / Item Type search',
                     data: data
                    })
             }).catch(err => {
                console.log(err)
            })

 
        //  console.log("body",req.params)
         
        //  sequelize.query(`select i.guid_key,item_ref,item_ref_type,layout_file,D365ItemCode,item_ref_desc,brandid,b.brand_name from tb_item_reference i left join tb_brand b on i.brandid=b.guid_key inner join tb_cust_brand cb on b.guid_key=cb.brand_guid_key inner join tb_cust cust on cust.guid_key=cb.cust_guid_key
        //  where 1=1 and cust.admin='${req.params.order_user}' and brandid='${req.params.brand_key}' and (item_ref like '%${req.params.item_ref}%' or D365ItemCode like '%${req.params.item_ref}%') and item_ref_type ='${req.params.item_ref_type}`, {type: sequelize.QueryTypes.SELECT}, { raw: true }).then(data=>  {
        //      res.json({
        //          message: 'Return Item listing with Brand / Item Code / Item Name / Item Type search',
        //          data: data
        //      })
        //  })
 
     })

 /**
  * @swagger
  *  path:
  * /api/Item/GetItem/order-user/{order_user}/brand-key/{brand_key}/item-ref/{item_ref}/item-ref-type/{item_ref_type}:
  *   get:
  *     summary: Return Item with Brand / Item Code / Item Name / Item Type search..
  *     description: Returns item refs under the user associated brand, If one of the search conditions is met, the query conditions are as follows, If the query condition has no value, all data is returned
  *     parameters:
  *       - in: path
  *         name: order_user
  *         description: Login ID
  *         schema:
  *           type: String
  *       - in: path
  *         name: brand_key
  *         description: brand key
  *         schema: 
  *           type: String
  *       - in: path
  *         name: item_ref
  *         description: Item Ref
  *         schema: 
  *          type: String
  *       - in: path
  *         name: item_ref_type
  *         description: Item Ref Type
  *         schema: 
  *          type: String
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Check order passed
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                  type: String
  *                  example: Return Item listing with Brand / Item Code / Item Name / Item Type search
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       brand_key:
  *                         type: string
  *                         description: brand key
  *                         example: 27c29b88-2c34-4de3-95a7-af2cd4ee9223
  *                       brand_name:
  *                         type: String
  *                         description: Brand Name
  *                         example:  ADIDAS (TRIMS)
  *                       guid_key:
  *                         type: String
  *                         description: Item ref key
  *                         example: 63b1ab07-5af6-4822-b86a-93a0b450fb6d
  *                       item_ref:
  *                         type: String
  *                         description: Item ref
  *                         example:  ADI-FW19-002-OptionA
  *                       item_ref_type:
  *                         type: String
  *                         description: Item ref type
  *                         example:  Woven Label
  *                       item_ref_desc:
  *                         type: String
  *                         description: Description
  *                         example:  FW19 Adidas Tango Lock Up Logo Label - Woven Base with Reverse Raised Print, Flat Print & Sew Down
  *                       layout_file:
  *                         type: String
  *                         description: Layout File
  *                         example:  
  *                       item_code:
  *                         type: String
  *                         description: D365 Item Code
  *                         example: 
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
 
  router.route('/GetItem/order-user/:order_user/brand-key/:brand_key/item-ref/:item_ref/item-ref-type/:item_ref_type')
      .get(getItemListValidation, async(req, res) => {

          const result = validationResult(req)

          if (Object.entries(result.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })

          let requestObj = {
            request: {
                  id: req.params.brand_key,
            }
          }

          let item = await getItem(requestObj)
          res.json({
            message: 'Return Item with Brand / Item Code / Item Name / Item Type search',
            data: item
          })
              
      
      })

 /**
  * @swagger
  *  path:
  * /api/Item/addItem/order-user/{order_user}/brand-key/{brand_key}/item-ref/{item_ref}/item-ref-type/{item_ref_type}:
  *   post:
  *     summary: Add Item listing with Brand / Item Code / Item Name / Item Type search.
  *     description: Add item 
  *     parameters:
  *       - in: path
  *         name: order_user
  *         description: Login ID
  *         schema:
  *           type: String
  *       - in: path
  *         name: brand_key
  *         description: brand key
  *         schema: 
  *           type: String
  *       - in: path
  *         name: item_ref
  *         description: Item Ref
  *         schema: 
  *          type: String
  *       - in: path
  *         name: item_ref_type
  *         description: Item Ref Type
  *         schema: 
  *          type: String
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Check order passed
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                  type: String
  *                  example: Return Item listing with Brand / Item Code / Item Name / Item Type search
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       brand_key:
  *                         type: string
  *                         description: brand key
  *                         example: 27c29b88-2c34-4de3-95a7-af2cd4ee9223
  *                       brand_name:
  *                         type: String
  *                         description: Brand Name
  *                         example:  ADIDAS (TRIMS)
  *                       guid_key:
  *                         type: String
  *                         description: Item ref key
  *                         example: 63b1ab07-5af6-4822-b86a-93a0b450fb6d
  *                       item_ref:
  *                         type: String
  *                         description: Item ref
  *                         example:  ADI-FW19-002-OptionA
  *                       item_ref_type:
  *                         type: String
  *                         description: Item ref type
  *                         example:  Woven Label
  *                       item_ref_desc:
  *                         type: String
  *                         description: Description
  *                         example:  FW19 Adidas Tango Lock Up Logo Label - Woven Base with Reverse Raised Print, Flat Print & Sew Down
  *                       layout_file:
  *                         type: String
  *                         description: Layout File
  *                         example:  
  *                       item_code:
  *                         type: String
  *                         description: D365 Item Code
  *                         example: 
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
 
  router.route('/addItem/order-user/:order_user/brand-key/:brand_key/item-ref/:item_ref/item-ref-type/:item_ref_type')
      .post(getItemListValidation, (req, res) => {

          const result = validationResult(req)

          if (Object.entries(result.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })

          let requestObj = {
                itemName: req.params.item_ref
          }
          insertItem(requestObj)
              .then(data => {
                  res.json({
                      message: 'Item added successfully',
                  })
              }).catch(err => {
                  console.log(err)
              })
      
      })

router.route("/DeleteItemList/order-user/:order_user/brand-key/:brand_key/item-ref/:item_ref/item-ref-type/:item_ref_type")
 /**
  * @swagger
  *  path:
  * /api/Item/DeleteItemList/order-user/{order_user}/brand-key/{brand_key}/item-ref/{item_ref}/item-ref-type/{item_ref_type}:
  *   delete:
  *     summary: Delete Item listing with Brand / Item Code / Item Name / Item Type search..
  *     description: Delete Item listing with Brand / Item Code / Item Name / Item Type search..
  *     parameters:
  *       - in: path
  *         name: order_user
  *         description: Login ID
  *         schema:
  *           type: String
  *       - in: path
  *         name: brand_key
  *         description: brand key
  *         schema: 
  *           type: String
  *       - in: path
  *         name: item_ref
  *         description: Item Ref
  *         schema: 
  *          type: String
  *       - in: path
  *         name: item_ref_type
  *         description: Item Ref Type
  *         schema: 
  *          type: String
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Check order passed
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                  type: String
  *                  example: Return Item listing with Brand / Item Code / Item Name / Item Type search
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       brand_key:
  *                         type: string
  *                         description: brand key
  *                         example: 27c29b88-2c34-4de3-95a7-af2cd4ee9223
  *                       brand_name:
  *                         type: String
  *                         description: Brand Name
  *                         example:  ADIDAS (TRIMS)
  *                       guid_key:
  *                         type: String
  *                         description: Item ref key
  *                         example: 63b1ab07-5af6-4822-b86a-93a0b450fb6d
  *                       item_ref:
  *                         type: String
  *                         description: Item ref
  *                         example:  ADI-FW19-002-OptionA
  *                       item_ref_type:
  *                         type: String
  *                         description: Item ref type
  *                         example:  Woven Label
  *                       item_ref_desc:
  *                         type: String
  *                         description: Description
  *                         example:  FW19 Adidas Tango Lock Up Logo Label - Woven Base with Reverse Raised Print, Flat Print & Sew Down
  *                       layout_file:
  *                         type: String
  *                         description: Layout File
  *                         example:  
  *                       item_code:
  *                         type: String
  *                         description: D365 Item Code
  *                         example: 
  *       400:
  *         description: Bad request
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
    .delete(getItemListValidation, (req, res) => {
        const result = validationResult(req)
 
        if (Object.entries(result.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })
        
        let requestObj = {
            request: {
                id: req.params.brand_key
            }
        }
        
        deleteItem(requestObj)
            // .then(data => {
                res.status(200).send({
                   message: "Item deleted successfully"
                })
            //         .catch(err => {
            //        res.status(400).send({message: "There was an error try again!"})
            //    })
           })
    // })

router.route("/UpdateItem/order-user/:order_user/brand-key/:brand_key/item-ref/:item_ref/item-ref-type/:item_ref_type")
 /**
  * @swagger
  *  path:
  * /api/Item/UpdateItem/order-user/{order_user}/brand-key/{brand_key}/item-ref/{item_ref}/item-ref-type/{item_ref_type}:
  *   put:
  *     summary:  Update Item listing with Brand / Item Code / Item Name / Item Type search..
  *     description: Update Item listing with Brand / Item Code / Item Name / Item Type search..
  *     parameters:
  *       - in: path
  *         name: order_user
  *         description: Login ID
  *         schema:
  *           type: String
  *       - in: path
  *         name: brand_key
  *         description: brand key
  *         schema: 
  *           type: String
  *       - in: path
  *         name: item_ref
  *         description: Item Ref
  *         schema: 
  *          type: String
  *       - in: path
  *         name: item_ref_type
  *         description: Item Ref Type
  *         schema: 
  *          type: String
  *     tags: [Items]
  *     responses:
  *       200:
  *         description: Item updated
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 message:
  *                  type: String
  *                  example: Return Item listing with Brand / Item Code / Item Name / Item Type search
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       brand_key:
  *                         type: string
  *                         description: brand key
  *                         example: 27c29b88-2c34-4de3-95a7-af2cd4ee9223
  *                       brand_name:
  *                         type: String
  *                         description: Brand Name
  *                         example:  ADIDAS (TRIMS)
  *                       guid_key:
  *                         type: String
  *                         description: Item ref key
  *                         example: 63b1ab07-5af6-4822-b86a-93a0b450fb6d
  *                       item_ref:
  *                         type: String
  *                         description: Item ref
  *                         example:  ADI-FW19-002-OptionA
  *                       item_ref_type:
  *                         type: String
  *                         description: Item ref type
  *                         example:  Woven Label
  *                       item_ref_desc:
  *                         type: String
  *                         description: Description
  *                         example:  FW19 Adidas Tango Lock Up Logo Label - Woven Base with Reverse Raised Print, Flat Print & Sew Down
  *                       layout_file:
  *                         type: String
  *                         description: Layout File
  *                         example:  
  *                       item_code:
  *                         type: String
  *                         description: D365 Item Code
  *                         example: 
  *       400:
  *         description: Bad request
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
  .put(getItemListValidation, (req, res) => {
        const result = validationResult(req)
 
      if (Object.entries(result.errors).length != 0) return res.send({ message: 'Check the parameter passed', erorrs: errors.array() })
      
      let requestObj = {
        request: {
              id: req.params.brand_key,
              itemTagName: req.params.item_ref
        }
      }
      
      getItem(requestObj)
          .then(data => {
            //  console.log("updated",data)
         })
        
      updateItem(requestObj)
          .then(async(data) => {
              let updatedItem = await getItem(requestObj)
            res.status(200).send({
                message: "Item updated successfully",
                data: updatedItem
            })
          }).catch(err => {
            console.log(err)
        })
      
     
    })
     
 router.route('/GetItemTypeList')
 /**
  * @swagger
  *  path:
  * /api/Item/GetItemTypeList:
  *   get:
  *     summary: Return Item type List API
  *     description: Return Item type List API
  *     tags: [Items]
  *     responses:
  *       200: 
  *         description: Item ref type List
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: string
  *                     example: 119
  *                   item_type_name:
  *                     type: string
  *                     example: 20210830001(20210831)Sub To Post From D365
  *                   parent_id:
  *                     type: string
  *                     example: 110
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
     .get( async (req,res) => {
        
        // const response = validationResult(req)

        const result = await GetItemTypeList()

        // if( Object.entries( response.errors).length != 0 ) return res.send({ message: 'Check the parameter passed', erorrs: response.array()})

        res.json({
            message: 'Return Item ref type List API...',
            data: result
        })
     })
 
 
 module.exports = router