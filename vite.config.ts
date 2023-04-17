import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
    plugins: [
        // ...your plugin
        compression(),
        compression({
            algorithm: 'brotliCompress',
            exclude: [/\.(br)$/, /\.(gz)$/],
            deleteOriginalAssets: true,
        }),
    ],
})
