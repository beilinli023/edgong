import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8083,
    proxy: {
      // 注释掉所有代理配置，避免不必要的API连接尝试
      /*
      // 带前缀的API路径
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 直接访问原始API路径
      '/programs': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/content-types': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/categories': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/tags': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/contents': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
      */
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
