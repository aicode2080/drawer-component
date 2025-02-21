import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';

console.log(process.env.NODE_ENV, '环境变量');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify('v1.0.0'),
    __API_URL__: 'window.__backend_api_url',
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'tailwind.config.cjs',
          dest: './',
        },
        {
          src: 'src/themes',
          dest: './src',
        },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      filename: 'sw',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cacheId: 'pwa-vite-component',
        runtimeCaching: [
          process.env.NODE_ENV !== 'production'
            ? {
                urlPattern: ({ url }) => url.origin === 'https://app-api-0.com',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'drawer-api',
                  cacheableResponse: {
                    statuses: [200],
                  },
                },
              }
            : {
                urlPattern: ({ url }) => url.origin === 'https://app-api.id',
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'drawer-api',
                  cacheableResponse: {
                    statuses: [200],
                  },
                },
              },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'drawer-images',
              expiration: {
                // 最多30个图
                maxEntries: 30,
              },
            },
          },
          {
            urlPattern: /.*\.js.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'drawer-js',
              expiration: {
                maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /.*\.css.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'drawer-css',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
          {
            urlPattern: /.*\.html.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'drawer-html',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
      manifest: {
        name: 'vite component',
        short_name: 'ViteComponent',
        description: 'ViteComponent',
        theme_color: '#ffffff',
        icons: [
          // {
          //   src: 'pwa-192x192.png',
          //   sizes: '192x192',
          //   type: 'image/png',
          // },
          // {
          //   src: 'pwa-512x512.png',
          //   sizes: '512x512',
          //   type: 'image/png',
          // },
        ],
      },
      // globIgnores: ['static/js/**'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {},
    watch: {},
  },
  // preview: {
  //   port: 3000, // 服务器端口
  // },
  server: {
    port: 5173,

    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // 使用 proxy 实例
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy 是 'http-proxy' 的实例
      //   },
      // },
      // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
      },
    },
  },
});
