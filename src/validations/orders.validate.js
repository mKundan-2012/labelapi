/**
 * @author: ntwari egide
 * @description: order validation module
 */

const { param } = require('express-validator')
const {check} = require('express-validator')

const addPOOrderValidation = [
    check('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    check('order_user', "Logni ID, is required, must be 50 characters").isString().isLength({max: 50}),
    check('order_keys', "Multiple po order keys must be passed").isArray()
]

const getMinExpectedDeliveryDateValidation = [
    param("brand_guid_key", "Brand primary key is required").isString().isLength({max: 50}),
    param("item_refs", "item refs(multiple item ref) are required").isArray(),
    param("erp_id", "Erp id is required").isString().isLength({max: 50})
]

const getOrderDetailValidation = [
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('order_user', "Logni ID, is required, must be 50 characters").isString().isLength({max: 50}),
    param('order_no', "Multiple po order keys must be passed").isArray(),
    param('is_po_order_tem', "Multiple po order keys must be passed").isString().isLength({ max: 1 })
]

const getPOOrderListValidation = [
    param('order_user', "Login ID is required, must be 50 characters").isString().isLength({ max: 50}),
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    // param('order_date_from', "order date from must be a date").isISO8601().matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/').optional(),
    // param('order_date_to', "order date to must be a date").isISO8601().matches('/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/').optional(),
    param('order_status', "status name must be a atmost 50").isString().isLength({max: 50}).optional(),
    param('factory_code', "factor code must be a string").isString().isLength({max: 50}).optional(),
    param('consolidated_id', "consolidated id must be a string").isString().isLength({max: 50}).optional(),
]

const getPOSizeTableTempListValidation = [
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('order_key', "order key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('is_po_order_temp', "is po order temp is required, must be 50 characters").isString().isLength({ max: 50}),

]

const getLocationListValidation = [
    param('brand_key', "Brand key is required, must be 50 characters").isString().isLength({ max: 50}),
    param('order_no', "order no is required, must be 50 characters").isString().isLength({ max: 50}),
    param('order_user', "Login ID is required, must be 50 characters").isString().isLength({ max: 50})
]

const savePOOrderValidation = [
    check("brand_key","Brand primary key  is required, must be 50 characters").isString().isLength({ max: 50}),
    check("guid_key","Guid key must be 50 characters").isString().isLength({ max: 50}).optional(),
    check("order_no","order no  must be 50 characters").isString().isLength({ max: 50}).optional(),
    check("num","order line must be 10 characters").isString().isLength({ max: 10}).optional(),
    check("order_user","Order User(client) must be 50 characters").isString().isLength({ max: 50}).optional(),
    check("po_number","Please complete the customer order reference, must be 50 characters").isString().isLength({ max: 50}),
    check("factory_code","Factory must be 50 characters").isString().isLength({ max: 50}).optional(),
    check("location_code","Please choose Production Location, must be 50 characters").isString().isLength({ max: 50}),
    check("order_expdate_delivery_date","Please enter a valid delivery date, must be 50 characters").isString().isLength({ max: 50}),
    check("approver_email_address","Please select at least 1 Approver Email Address first, must be atmost 200 characters").isString().isLength({ max: 200}).optional(),
    check("draft_order_email","Please select at least 1 Approver Email Address first, must be atmost 200 characters").isString().isLength({ max: 200}).optional(),
    check("size_matrix_type","size matrix type, must be atmost 200 characters").isString().isLength({ max: 200}).optional(),
    check("size_content","size content").isString().optional(),
    check("default_size_content","default size content").isString().optional(),
    check("size_pointer","size pointer must be 50 characters").isString().isLength({ max: 50 }).optional(),
    check("order_status","order status size content must be atmost 50 characters").isString().isLength({ max: 50 }).optional(),
    check("is_copy_order","is copy order").isString().isLength({ max: 1}).optional(),
    check("coo","coo content must be atmost 100 characters").isString().optional().isLength({ max: 100}),
    check("shrinkage_percentage","shrinkage percentage must be atmost 10 integers").isString().isLength({ max: 10 }).optional(),
    check("update_user","update user must be atmost 50 characters").isString().isLength({ max: 10 }).optional(),
    check("update_date","update date must be atmost 23 characters").isString().optional(),
    
    //invoice_address
    check("invoice_address.invoice_address_id","invoice_address_id must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("invoice_address.invoice_contact_id","invoice_contact_id must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("invoice_address.invoice_cpyname","Please complete the invoice details, must be atmost 255 characters").optional().isString().isLength({ max: 255}),
    check("invoice_address.invoice_contact","invoice_contact must be atmost 200 characters").optional().isString().isLength({ max: 200}),
    check("invoice_address.invoice_phone","invoice_phone must be atmost 200 characters").optional().isString().isLength({ max: 200}),
    check("invoice_address.invoice_fax","invoice_fax must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("invoice_address.invoice_email","Please fill in the correct mailbox format, atmost 1000 characters").optional().isString().isLength({ max: 1000}),
    check("invoice_address.invoice_addr","invoice_addr atmost 500 characters").optional().isString().isLength({ max: 500}),
    check("invoice_address.invoice_addr2","invoice_addr2 atmost 500 characters").optional().isString().isLength({ max: 500}),
    check("invoice_address.invoice_addr3","invoice_addr3 atmost 500 characters").optional().isString().isLength({ max: 500}),
    
    //delivery_address
    check("delivery_address.delivery_address_id","delivery_address_id atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("delivery_address.delivery_contact_id","delivery_contact_id atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("delivery_address.delivery_cpyname","Please complete the delivery details, must be atmost 255 characters").optional().isString().isLength({ max: 255}),
    check("delivery_address.delivery_contact","Please complete the delivery details. must be atmost 200 characters").optional().isString().isLength({ max: 200}),
    check("delivery_address.delivery_phone","Please complete the delivery_phone, must be atmost 200 characters").optional().isString().isLength({ max: 200}),
    check("delivery_address.delivery_fax","Please complete the delivery_fax, must be atmost 200 characters").optional().isString().isLength({ max: 200}),
    check("delivery_address.delivery_fax","Please complete the delivery_fax, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("delivery_address.delivery_email","Please complete the delivery_email, must be atmost 500 characters").optional().isString().isLength({ max: 500}),
    check("delivery_address.delivery_city","Please complete the delivery_city, must be atmost 100 characters").optional().isString().isLength({ max: 100}),
    check("delivery_address.delivery_country","Please complete the delivery_country, must be atmost 100 characters").optional().isString().isLength({ max: 100}),
    check("delivery_address.delivery_post_code","Please complete the delivery_post_code, must be atmost 100 characters").optional().isString().isLength({ max: 100}),
    check("delivery_address.delivery_addr","Please complete the delivery_addr, must be atmost 500 characters").optional().isString().isLength({ max: 500}),
    check("delivery_address.delivery_addr2","Please complete the delivery_addr2, must be atmost 500 characters").optional().isString().isLength({ max: 500}),
    check("delivery_address.delivery_addr3","Please complete the delivery_addr3, must be atmost 500 characters").optional().isString().isLength({ max: 500}),

    //dynamic fields
    check("dynamic_field.field_id","Please complete the field_id, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("dynamic_field.field_value","Please complete the field_value, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("dynamic_field.field_label","Please complete the field_label, must be atmost 1500 characters").optional().isString().isLength({ max: 1500}),

    //item ref
    check("item_ref.item_key","Please complete the item_key, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("item_ref.item_ref","Please complete the item_ref, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("item_ref.qty","Please complete the qty, must be atmost 10 numbers").optional().isInt().isLength({ max: 10}),
    check("item_ref.price","Please complete the price, must be atmost 20 characters").optional().isString().isLength({ max: 20}),
    check("item_ref.currency","Please complete the currency, must be atmost 20 characters").optional().isString().isLength({ max: 20}),

    // contents
    check("contents.brand_key","Please complete the contents.brand_key, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.order_user","Please complete the Belong to details ,order_user, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content_custom_number","Please complete the contents.content_custom_number, must be atmost 300 characters").optional().isString().isLength({ max: 300}),
    check("contents.content_number","Please complete the contents.content_number, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content_number_key","Please complete the contents.content_number_key, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.care_custom_number","Please complete the contents.care_custom_number, must be atmost 300 characters").optional().isString().isLength({ max: 300}),
    check("contents.care_number","Please complete the contents.care_number, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.care_number_key","Please complete the contents.care_number_key, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content_group","Please complete the contents.content_group, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content.part_key","Please complete the translation guid key for part, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content.cont_key","Please complete translation guid key for content, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.content.percentage","Please complete contents.content.percentage, must be atmost 10 integers").optional().isInt().isLength({ max: 10}),
    check("contents.content.seqno","Please complete contents.content.seqno, must be atmost 10 integers").optional().isInt().isLength({ max: 10}),

    // default_content

    check("contents.default_content.cont_key","Please complete translation guid key for content, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.default_content.seqno","Please complete contents.default_content.seqno, must be atmost 10 integers").optional().isInt().isLength({ max: 10}),

    // care object

    check("contents.care.cont_key","Please complete translation guid key for content, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.care.seqno","Please complete contents.default_content.seqno, must be atmost 10 integers").optional().isInt().isLength({ max: 10}),

    // icon object

    check("contents.icon.icon_key","Please complete translation guid key for content, must be atmost 50 characters").optional().isString().isLength({ max: 50}),
    check("contents.icon.seqno","Please complete contents.icon.seqno, must be atmost 10 integers").optional().isInt().isLength({ max: 10}),
    check("contents.icon.icon_type_id","Please complete icon type, must be atmost 10 characters").optional().isString().isLength({ max: 10}),
    check("contents.icon.icon_group","Please complete icon_group, must be atmost 1 character").optional().isString().isLength({ max: 1})

]

module.exports = {addPOOrderValidation, getMinExpectedDeliveryDateValidation, getOrderDetailValidation, getPOOrderListValidation, getPOSizeTableTempListValidation, getLocationListValidation, savePOOrderValidation}