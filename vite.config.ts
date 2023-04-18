import { defineConfig } from 'vite'

import { compression } from 'vite-plugin-compression2'

export default defineConfig({
    plugins: [
        compression({
            include: [/\.(js|mjs|json|css|html)$/],
            exclude: [/\.(br)$/, /\.(gz)$/],
            algorithm: 'brotliCompress',
        }),
    ],
})
