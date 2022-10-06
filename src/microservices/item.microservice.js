const { sequelize } = require("../database/database");
exports.GetItemRefDetail = async (guid_key) => {
  let itemRefDetail = await sequelize.query(`Select b.brand_name,it.tag_name,i.*
    from tb_item_reference i left join tb_brand b on b.guid_key=i.brandid left join tb_itemtag it on i.itemtag_id=it.id where 1=1 AND i.guid_key='${guid_key}'`);

  return itemRefDetail[0];
};

exports.GetItemList = async (
  order_user,
  brand_key,
  item_ref,
  item_ref_type
) => {
  let itemList = await sequelize.query(`select
    i.guid_key,item_ref,item_ref_type,layout_file,D365ItemCode,item_ref_desc,brandid,
    b.brand_name
    from tb_item_reference i
    left join tb_brand b on i.brandid=b.guid_key
    inner join tb_cust_brand cb on b.guid_key=cb.brand_guid_key
    inner join tb_cust cust on cust.guid_key=cb.cust_guid_key
    where 1=1
    and cust.admin='${order_user}'
    and brandid='${brand_key}'
    and ( item_ref like '${item_ref}' or D365ItemCode like '${item_ref}' )
    and item_ref_type ='${item_ref_type}'`);

  return itemList;
};

exports.GetItemTypeList = async () => {
  let itemTypeList = await sequelize.query(
    ` SELECT id,name FROM tb_item_ref_type order by name`
  );

  return itemTypeList;
};
