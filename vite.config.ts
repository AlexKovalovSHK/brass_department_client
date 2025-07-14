import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Настраиваем прокси
    proxy: {
      // Все запросы, начинающиеся с /api, будут перенаправлены
      '/api': {
        // Цель, куда перенаправлять запросы
        target: 'https://brass-serv.shk.solutions',
        // Обязательно для работы с HTTPS и виртуальными хостами
        changeOrigin: true,
        // Убираем /api из пути при перенаправлении.
        // Пример: /api/v1/users -> /v1/users
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Если у вашего бэкенда самоподписанный сертификат (в вашем случае нет, но полезно знать)
        // secure: false, 
      },
    },
  },
})

/*export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  }
})*/