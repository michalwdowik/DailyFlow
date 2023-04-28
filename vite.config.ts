import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import viteCompression from 'vite-plugin-compression';
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import preact from "@preact/preset-vite";


export default defineConfig({
    plugins: [
        viteCompression(),
        ViteMinifyPlugin({}),
        preact({ devtoolsInProd: true }),
        VitePWA({
          strategies: "generateSW",
          registerType: "autoUpdate",
          workbox: {
            globPatterns: ["**/*.{js,css}"],
            navigateFallback: null,
          },
            devOptions: {
                enabled: true,
                type: 'module',
                navigateFallback: "index.html",
            },
  

            manifest: {
                id: '/',
                start_url: "./",
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

