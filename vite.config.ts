import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import { compression } from 'vite-plugin-compression2'

export default defineConfig({
    plugins: [
        compression({
            include: [/\.(js|mjs|json|css|html)$/],
            exclude: [/\.(br)$/, /\.(gz)$/],
            algorithm: 'brotliCompress',
        }),
        VitePWA({
            devOptions: {
                enabled: true,
                // type: 'module',
            },
            registerType: 'autoUpdate',

            manifest: {
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/icons/icon.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
})
