export const base_url = "http://134.122.77.107:8090/";

export const getMeUrl = `${base_url}api/user/me`;

// USER CONTROLLER
export const user_register = `${base_url}api/user/register`;
export const user_login = `${base_url}api/user/login`;

// TERMINAL CONTROLLER
export const terminal_create = `${base_url}terminal/create`;
export const terminal_get = `${base_url}terminal/list`;
export const terminal_update = `${base_url}terminal/update/`; // id kirib keladi
export const terminal_isActive = `${base_url}terminal/deactive/`; // id kirib keladi