import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    server: {
        port: 8000,
    },
    plugins: [
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
                name: 'DailyFlow',
                short_name: 'DailyFlow',
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
