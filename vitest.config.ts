import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      include: ['miniprogram/**/*.ts'],
      exclude: ['miniprogram/app.ts', 'miniprogram/components/**', 'miniprogram/types/**']
    }
  },
  resolve: {
    alias: {
      '@': '/workspace/project/miniprogram'
    }
  }
});
