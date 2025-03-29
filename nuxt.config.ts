// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    esbuild: {
      options: {
        target: 'es2022'
      }
    }
  }
})
