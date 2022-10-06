const {sequelize} = require('../database/database')

exports.getCountryTranslationList = async (brand_key, page_type, query_str) => {
    let allcountry = []
    allcountry  = await sequelize.query(
        `
        DELIMITER //
        
        DROP PROCEDURE Sp_CooTranslationApproved;
        
        CREATE PROCEDURE Sp_CooTranslationApproved (IN BrandId NVARCHAR(100),IN PAGETYPE NVARCHAR(100),
         TopNum NVARCHAR(100),IN SelectField NVARCHAR(100),IN SelectStr NVARCHAR(200))
        
        BEGIN
        DECLARE  AllCountry TEXT;
        DECLARE  CurrentCountry NVARCHAR(100);
        DECLARE  DynamicTable NVARCHAR(50);
        DECLARE  CountryCodeId INT;
        
        CREATE TABLE IF NOT EXISTS   CountryCodeTb
        (
        Id INT PRIMARY KEY DEFAULT 1,
        CountryCode NVARCHAR(50)
        );
        
        SET  AllCountry='GB_STATUS=''A''';	
        SET  CurrentCountry='';
        
        -- SQLINES LICENSE FOR EVALUATION USE ONLY
        select  DynamicTable=TbTranslation from tb_dynamictable a left join tb_brand b on a.ForeignKey=b.translation_code and a.SourceType='Trans' where b.guid_key= BrandId;
        ----
        
        CREATE SEQUENCE IF NOT EXISTS CountryCodeTb_seq;
        
        
        -- SQLINES LICENSE FOR EVALUATION USE ONLY
        INSERT INTO  CountryCodeTb( CountryCode )
        SELECT country_code FROM tb_countrycode A LEFT JOIN tb_coo_country_code B
        ON A.guid_key=B.country_code_key WHERE B.brandid= BrandId AND B.show_status='Y';
        
        WHILE EXISTS (SELECT Id FROM  CountryCodeTb) 
        DO
         -- SQLINES LICENSE FOR EVALUATION USE ONLY
         SELECT  CountryCodeId as Id,  CurrentCountry as CountryCode FROM  CountryCodeTb LIMIT 1;
         SET  AllCountry= AllCountry+' AND '+ CurrentCountry+'_STATUS=''A''';
         
         DELETE FROM  CountryCodeTb WHERE Id= CountryCodeId;
        END WHILE;
        
        -- SET @query = CONCAT("SELECT  guid_key as label,GB_TRANSLATION as value FROM ",DynamicTable," WHERE PAGETYPE='''+ PAGETYPE+''' AND '+ SelectField+' LIKE N''%'+ SelectStr+'%'' AND '+ AllCountry+ ' ORDER BYGB_TRANSLATION ");
        
        -- SELECT  guid_key as label,GB_TRANSLATION as value FROM '+ DynamicTable+' WHERE PAGETYPE='''+ PAGETYPE+''' AND '+ SelectField+' LIKE N''%'+ SelectStr+'%'' AND '+ AllCountry+ ' ORDER BY GB_TRANSLATION LIMIT '+ TopNum+' ;
        -- PREPARE st FROM @query;
        -- EXECUTE st;
        
        SELECT  AllCountry;
        
        END;
        
        CALL Sp_CooTranslationApproved("2345","45245","345234","3425345","25234");
        
        //
        
        `
    ).then(()=> {})
    .catch(error=> {
        console.log('Error ---------------------', error)
        allcountry=[]
    })

    return allcountry;
}