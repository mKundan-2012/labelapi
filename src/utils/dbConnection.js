const { Sequelize } = require('sequelize');
 const sequelize = new Sequelize('po_order_new', 'new_user', 'password', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
      });

   try {
    console.log('Connection has been established successfully.');
    sequelize.authenticate()
   } catch (error) {
    console.error(error)
}
   
module.exports = { sequelize }