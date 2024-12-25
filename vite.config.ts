import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)), 
      "@components": fileURLToPath(new URL('./src/components', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      "@interfaces":fileURLToPath(new URL('./src/interfaces',import.meta.url)),
      "@hooks":fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)), 
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)), 
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
    },
  },
});

