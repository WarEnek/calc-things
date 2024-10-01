// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vite-pwa/nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  pwa: {
    manifest: {
      name: 'CalcThings',
      short_name: 'CalcThings',
      description: 'Calculate Things',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      // Используем navigateFallback, чтобы приложение работало оффлайн и возвращало index.html при отсутствии интернета
      navigateFallback: '/index.html',

      // Глобальное кэширование всех необходимых ресурсов: HTML, JS, CSS, изображения
      globPatterns: ['**/*.{js,css,html,png,svg,jpg,json}'],

      runtimeCaching: [
        {
          // Кэшируем запросы на получение страниц (HTML)
          urlPattern: ({request}) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
            },
          },
        },
        {
          // Кэшируем JS и CSS файлы
          urlPattern: /.*\.(?:js|css)/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
            },
          },
        },
        {
          // Кэшируем изображения
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
            },
          },
        },
        {
          // Кэшируем API-запросы
          urlPattern: /\/api\/.*\/*.json/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 7 дней
            },
          },
        },
      ],
    },
  },
});
