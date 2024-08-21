import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    plugins: [ // 必有插件
        VueJsx(),
        vue()
    ],
    resolve: {
        alias: { // 路径别名
            "@": resolve(__dirname, 'src'),
        }
    }
})
