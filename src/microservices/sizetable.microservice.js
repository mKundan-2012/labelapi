/**
 * @author: ntwari egide
 * @description: The size table microservices implementation
 */

 const { sequelize } = require("../database/database")

 exports.GetSizeTableDetail =  async ( guid_key ) => {

    const reponse = await sequelize.query(`
    Select * from tb_size_matrix_type where id='${guid_key}'
    `)

    return reponse;
 }