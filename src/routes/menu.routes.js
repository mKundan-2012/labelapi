/**
 * @author: ntwari egide
 * @description: The menu routing module
 */

const express = require('express')

const router = express.Router()


console.log('reached here in menu ................')
/**
 * @swagger
 * tags:
 *  name: Menu
 *  description: po menu apis are here
 */


/**
 * @swagger
 * path:
 * /api/Menu/GetMenuList/menu_type/{menu_type}:
 *   get:
 *     summary: Return order detail
 *     description: Return order detai
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menu_type
 *         description: Menu type
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
router.route('/GetMenuList/menu_type/:menu_type')
    .get( (req,res) => {


        console.log("Menu: reqwuest reached here...")

        const result = [
                {
                "id": 1,
                "name": "Order",
                "child_menu": [
                {
                "id": 1,
                "name": "Order",
                "route": "/Order"
                },
                {
                "id": 2,
                "name": "PO Order",
                "route": "/POOrder"
                },
                {
                "id": 3,
                "name": "List",
                "route": "/List"
                }
                ]
                },
                {
                "id": 2,
                "name": "Invoice / Online Payment",
                "child_menu": null
                },
                {
                "id": 3,
                "name": "Print",
                "child_menu": null
                }
           ]

        res.json({
            message: 'Return the menu list',
            data: result
        })
        
    })


module.exports = router
