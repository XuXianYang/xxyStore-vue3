/*
封装成vue实例函数式调用
vue3.0使用app.config.globalProperties挂载原型方法,也支持直接导入函数使用
*/

// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

export default ({ title, text }) => {
    return new Promise((resolve, reject) => {
        const submitCallback = () => {
            render(null, div)
            resolve()
        }
        const cancelCallback = () => {
            render(null, div)
            reject(new Error('点击取消'))
        }
        // 1. 渲染组件
        // 2. 点击确认按钮，触发resolve同时销毁组件
        // 3. 点击取消按钮，触发reject同时销毁组件
        const vnode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
        render(vnode, div)
    })
}