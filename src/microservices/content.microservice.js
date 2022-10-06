const { sequelize } = require("../database/database")


exports.GetContentNumberDetail = async (brand_key, content_number, order_user, style_number) => {
    
    const contentNumberDetail = await sequelize.query(`
    SELECT b.content_key, GB_TRANSLATION FROM tb_content AS b 
LEFT JOIN tb_content AS a ON a.style_number=b.content_key 
LEFT JOIN tb_translation AS c ON c.guid_key=b.content_key 
WHERE a.content_key='${content_number}';`)

    return contentNumberDetail;
   
}

exports.getContentNumberSetting = async (brand_key) => {
    const contentNumberSetting = await sequelize.query(` Select * from tb_brand where guid_key='${brand_key}'`)

    return contentNumberSetting;
}


exports.getContentNumberList = async (brand_key, content_group, query_str, order_user) => {

    const contentNumberList = await sequelize.query(`
    SELECT style_number,custom_number,content_key as guid_key,Userid as user_id FROM tb_content A
   WHERE A.ApprovedState='Y' AND (A.type='{1}' OR ISNULL('{1}')='') AND (A.Userid='${order_user}' OR A.Userid='') AND A.IsEnable='Y';`)

    return contentNumberList;

}


exports.getDefaultContentByContentKey = async (brand_key,cont_key,page_type) => {

    const deafultContent = await sequelize.query(`
    select C.RelationContentKey as value ,D.GB_TRANSLATION as label
    from tb_defaultcontentmaintenance C LEFT JOIN tb_translation D on C.RelationContentKey=D.guid_key
    where C.contentkey ='${cont_key}' order by D.GB_TRANSLATION;`)

    return deafultContent
} 

exports.matchMultiContentNumber =  async (brand_key,order_user,content_group,part_key,cont_key,percentage,seqno1,cont_key1,seqno2,care_key,icon_key,icon_type_id,seqno3) => {
    const contentnum = await sequelize.query(`
    -- SQLINES LICENSE FOR EVALUATION USE ONLY
    SELECT * FROM (SELECT A.custom_number, style_number,Userid,
    (SELECT ISNULL(D.guid_key)+','
    FROM tb_care_dtl C LEFT JOIN tb_translation D ON C.Cont_key=D.guid_key
    WHERE C.care_key=A.style_number ORDER BY seqno 
    ) Care,
    (SELECT ISNULL(Part_key)+','+ISNULL(Cont_key)+',' + ISNULL(ENPercent)+'/'
    FROM tb_content_dtl WHERE content_key=A.style_number ORDER BY seqNo ) Content,
    (SELECT ISNULL(C.sysicon_key)+',' FROM tb_care_icon C LEFT JOIN tb_sys_iconitem IconType ON C.IconTypeId=IconType.id
    WHERE C.care_key=A.style_number AND IconType='A' ORDER BY IconType.seq 
    ) IconA,
    (SELECT ISNULL(care_key)+',' FROM tb_care_icon C WHERE C.care_key=A.style_number AND IconType='B' ORDER BY seqno ) IconB,A.content_key FROM tb_content A
    WHERE (A.type='${icon_type_id}') AND (A.Userid='${order_user}' or (A.Userid='' AND IsEnable='Y' )) AND A.brandid='${brand_key}'
    ) A
    where 1=1 limit 1;  
    `)

    return contentnum;
}


exports.getIconSequence = async (brand_key, icon_group, icon_key) => {

    let result = await sequelize.query(
        `SELECT A.sysicon_key,B.ENDescr,B.enfile,B.enfile_foot,
        iconSymbol,C.*
        FROM (SELECT A.ID AS IconTypeId, ISNULL(SeqNo) AS SeqNo
        ,ISNULL(IsEnable)AS IsEnable,ISNULL(Alias) AS sys_typ
        FROM (SELECT * FROM tb_sys_iconitem WHERE icon_group='${icon_group}') A
        LEFT JOIN (SELECT * FROM tb_brandiconconfigure WHERE BrandId='${brand_key}') B
        ON A.id=B.IconTypeId) C
        LEFT JOIN (SELECT seqno,sysicon_key,IconTypeId FROM tb_care_icon WHERE care_key='${icon_key}' AND IconType='F' )A
        LEFT JOIN tb_sys_icon B
        ON A.sysicon_key=B.guid_key
        ON A.IconTypeId=C.IconTypeId WHERE C.IsEnable='Y' ORDER BY C.SeqNo;`
    )

    return result;

 }