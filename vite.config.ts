import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// import preact from '@preact/preset-vite'
// import ViteRestart from 'vite-plugin-restart'
// import react from '@vitejs/plugin-react'

export default defineConfig({
    // server: {
    //     watch: {
    //         usePolling: true,
    //     },
    // },
    plugins: [
        // preact({ devtoolsInProd: true }),
        // react(),
        // ViteRestart({
        //     restart: ['my.config.[jt]s'],
        // }),
        VitePWA({
            strategies: 'generateSW',
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css}'],
                navigateFallback: null,
            },
            devOptions: {
                enabled: true,
                type: 'module',
                navigateFallback: 'index.html',
            },

            manifest: {
                id: '/',
                start_url: './',
                name: 'To Do App',
                short_name: 'ToDo',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
})
