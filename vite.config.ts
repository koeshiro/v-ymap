import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import dts from "vite-plugin-dts";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'v-ymap',
      formats: ['es','cjs','umd'],
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      exclude: ['node_modules','tests'],
      tsConfigFilePath: resolve(__dirname, 'tsconfig.json'),
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
