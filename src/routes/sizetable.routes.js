/**
 * @author: ntwari egide
 * @description: The size table router implementation
 */

const express = require('express');
const { GetSizeTableDetail } = require('../microservices/sizetable.microservice');

const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: SizeTable
 *  description: po orders sizetable apis are here
 */


 
/**
 * @swagger
 * path:
 * /api/SizeTable/GetSizeTableDetail/guid-key/{guid_key}:
 *   get:
 *     summary: Return order detail
 *     description: Return order detai
 *     tags: [SizeTable]
 *     parameters:
 *       - in: path
 *         name: guid_key
 *         description: Guid key
 *         schema:
 *           type: string
 *         required: true
 *     responses:
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
router.route( '/GetSizeTableDetail/guid-key/:guid_key' )
.get( async (req,res) => {

    let sizeTableDetails = await GetSizeTableDetail(req.params.guid_key)

    res.json({
        message: 'Return multiple po size table list',
        data: sizeTableDetails
    })
    
})

module.exports = router