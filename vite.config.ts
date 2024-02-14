import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    server: {
        port: 5200,
        proxy: {
            "/api/v1": {
                target: "http://localhost:3000/",
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "/src"),
        },
    },
})
