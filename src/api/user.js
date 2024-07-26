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

// QQ登录，unionId第三方登录唯一标识，source - 来源 1为pc，2为webapp
export const userQQLogin = (unionId, source = 6) => {
    return request('/login/social', 'post', { unionId, source })
}

// 获取QQ绑定的时候短信验证码
export const userQQBindCode = (mobile) => {
    return request('/login/social/code', 'get', { mobile })
}

// QQ登录-绑定帐号
export const userQQBindLogin = ({ unionId, mobile, code }) => {
    return request('/login/social/bind', 'post', { unionId, mobile, code })
}

// 校验帐号是否存在
export const userCheckAccount = (account) => {
    return request('/register/check', 'get', { account })
}

// 获取QQ完善信息的时候短信验证码
export const userQQPatchCode = (mobile) => {
    return request('/register/code', 'get', { mobile })
}

// QQ登录-完善信息
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
    return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}