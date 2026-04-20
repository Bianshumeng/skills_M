import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const apiTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8080'
  const cspContent = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    `connect-src 'self' ${apiTarget}`,
  ].join('; ')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-production-csp',
        apply: 'build',
        transformIndexHtml() {
          return [
            {
              tag: 'meta',
              attrs: {
                'http-equiv': 'Content-Security-Policy',
                content: cspContent,
              },
              injectTo: 'head',
            },
          ]
        },
      },
    ],
    server: {
      host: '127.0.0.1',
      port: 3000,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
