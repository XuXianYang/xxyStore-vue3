import request from "@/utils/request"

// 帐号登录
export const userAccountLogin = ({ account, password }) => {
    return request('/login', 'post', { account, password })
}

// 短信登录
export const userMobileLogin = ({ mobile, code }) => {
    return request('/login/code', 'post', { mobile, code })
}

// 获取短信登录验证码
export const userMobileLoginMsg = (mobile) => {
    return request('/login/code', 'get', { mobile })
}