/*
封装成vue实例函数式调用
vue3.0使用app.config.globalProperties挂载原型方法,也支持直接导入函数使用
*/

// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
// 定时器标识
let timer = null

export default ({ type, text }) => {
    // 实现：根据xtx-message.vue渲染消息提示
    // 1. 导入组件
    // 2. 根据组件创建虚拟节点
    const vnode = createVNode(XtxMessage, { type, text })
    // 3. 准备一个DOM容器
    // 4. 把虚拟节点渲染DOM容器中
    render(vnode, div)
    // 5. 开启定时，移出DOM容器内容
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 3000)
}