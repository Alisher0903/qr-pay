export const base_url = "https://apk.qrpay.uz/";

export const getMeUrl = `${base_url}api/user/me`;

// USER CONTROLLER
export const user_register = `${base_url}api/user/register`;
export const user_login = `${base_url}api/user/login`;
export const user_request = `${base_url}request/save`;
export const user_edit = `${base_url}api/user/update`;
export const user_merchant = `${base_url}api/user/page`;
export const user_terminal = `${base_url}api/user/terminal`;
export const user_edit_status = `${base_url}api/user/user-active`;


// TERMINAL CONTROLLER
export const terminal_create = `${base_url}terminal/create`;
export const terminal_get = `${base_url}terminal/list`;
export const terminal_update = `${base_url}terminal/update/`; // id kirib keladi
export const terminal_isActive = `${base_url}terminal/deactive/`; // id kirib keladi

// ORDER CONTROLLER
export const order_create = `${base_url}payment/create`
export const seller_order_get = `${base_url}payment/list/for/seller`
export const terminal_order_get = `${base_url}payment/list/for/terminal`
export const admin_order_get = `${base_url}payment/list/for/admin`
export const order_cancel = `${base_url}payment/cancel`

// Notification CONTROLLER
export const delete_notification = `${base_url}notification/delete`
export const isRead_notification = `${base_url}notification/is-read`
export const admin_notification = `${base_url}notification/for-admin`
export const seller_notification = `${base_url}notification/for-seller`
export const terminal_notification = `${base_url}notification/for-terminal`
export const admin_notification_count = `${base_url}notification/count/for-admin`
export const seller_notification_count = `${base_url}notification/count/for-seller`
export const terminal_notification_count = `${base_url}notification/count/for-terminal`

// REQUEST CONTROLLER
export const requestSave = `${base_url}request/save`
export const requestUpdateStatus = `${base_url}request/change-status`
export const requestGetAdmin = `${base_url}request`


// STATISTIC CONTROLLER
export const get_admin_statistic = `${base_url}statistics/admin`
export const get_seller_statistic = `${base_url}statistics/seller                   `
export const get_admin_request_web = `${base_url}statistics/admin/request-web`
export const get_month_statistic = `${base_url}statistics/month`
export const get_payment_statistic_forSeller = `${base_url}statistics/payment`
export const get_year = `${base_url}statistics/year`