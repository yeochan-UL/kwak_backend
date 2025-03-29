// server/api/hello.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
    return { message: 'Nuxt API 정상 작동 중 🚀' }
})
