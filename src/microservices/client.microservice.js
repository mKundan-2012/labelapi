const { sequelize } = require("../database/database")


exports.GetClientDetail = async(order_user) => {
    let clientDetails = await sequelize.query(`Select * from tb_cust 
    where admin='${order_user}'`, order_user)

    return clientDetails[0]
}

exports.getClientAddressList = async (order_user, address_type) => {

    let clientDetail = await sequelize.query(`
    Select * from tb_cust where admin='${order_user}'`,{ raw: true })

    let response = []

    if(address_type.toLowerCase() === "invoice" ) {
        response = await sequelize.query(`
        SELECT Name as name , DynAddressID as dyn_id FROM tb_d365address as addr
        left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation
        where DynCustomerID=(select DynCustomerID from tb_cust where admin='${order_user}')
        AND AddressType='Invoice' and type='Address' ) as cr on cr.dtlid=addr.DynAddressID
        where isnull(cr.dtlid) <>'' 
        order by name LIMIT 50;
        `)
    }

    else if( address_type.toLowerCase() === "delivery") {
        response = await sequelize.query(
            `
            SELECT Name as name , DynAddressID as dyn_id FROM tb_d365address as addr
            left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation
            where DynCustomerID=(select DynCustomerID from tb_cust where admin='${order_user}')
            AND AddressType='Delivery' and type='Address' ) as cr on cr.dtlid=addr.DynAddressID
            where isnull(cr.dtlid) <>'' 
            order by name LIMIT 50;
`
        )


    }

    else if( address_type.toLowerCase() === "contact") {
        response = await sequelize.query(`
        SELECT DynContactID as dyn_id,FullName as name,email,phone FROM tb_d365contact as cont
        left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation
        where DynCustomerID=(select DynCustomerID from tb_cust where admin= '${order_user}') and type='Contact' ) as cr on cr.dtlid=cont.DynContactID
        where isnull(cr.dtlid)<>'' order by FullName;
    `)
    }


    return response;
}

exports.getClientAddressDetail = async (order_user,address_type, address_id ) => {
    let clientDetail = await sequelize.query(`
    Select * from tb_cust where admin='${order_user}'`,{ raw: true })

    let response = []

    if(address_type.toLowerCase() === "invoice" ) {
        response = await sequelize.query(`
        SELECT GuidKey as guid_key,cr.DynCustomerID as dyn_customer_id,DynAddressID as dyn_address_id,name,FormattedAddress as address,Zip as post_code,
        city,CountryCode as country, '' as address2, '' as address3 FROM tb_d365address as addr
left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation where DynCustomerID=(select DynCustomerID from tb_cust where admin='${order_user}')
 AND AddressType='Invoice' and type='Address' ) as cr on cr.dtlid=addr.DynAddressID
where isnull(cr.dtlid)<>'' and DynAddressID ='${address_id}';
        `)
    }

    else if( address_type.toLowerCase() === "delivery") {
        response = await sequelize.query(
            `
            SELECT GuidKey as guid_key,cr.DynCustomerID as dyn_customer_id,DynAddressID as dyn_address_id,name,FormattedAddress as address,Zip as post_code,
        city,CountryCode as country, '' as address2, '' as address3 FROM tb_d365address as addr
left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation where DynCustomerID=(select DynCustomerID from tb_cust where admin='${order_user}') AND AddressType='Delivery' and type='Address' ) as cr on cr.
dtlid=addr.DynAddressID
where isnull(cr.dtlid)<>'' and DynAddressID ='${address_id}';
            `
        )


    }

    else if( address_type.toLowerCase() === "contact") {
        response = await sequelize.query(`
        SELECT GuidKey as guid_key,cr.DynCustomerID as dyn_customer_id,DynContactID as dyn_contact_id,FullName as name,email,phone,fax FROM tb_d365contact as cont
left join (select AddressType,dtlid,DynCustomerID from tb_d365customerrelation where DynCustomerID=(select DynCustomerID from tb_cust where admin='${order_user}') 
and type='Contact' ) as cr on cr.dtlid=cont.DynContactID
where isnull(cr.dtlid)<>'' and DynContactID='${address_id}';
    `)
    }


    return response;
}