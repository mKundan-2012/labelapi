exports.LoginApi = async(order_user) => {
    let clientDetails = await sequelize.query(`Select * from users 
    where admin='${order_user}'`, order_user)
    return clientDetails[0]
}