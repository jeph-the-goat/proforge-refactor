import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    // Add SVGR support similar to the webpack config in next.config.ts
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            {
              name: 'prefixIds',
              params: {
                prefix: (node: any, info: any) => {
                  let hash = 0;
                  const str = info?.path || 'svg';
                  for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0xffffffff;
                  }
                  return Math.abs(hash).toString(36).slice(0, 6) + '__';
                }
              }
            }
          ],
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: [
      'node_modules/',
      'dist/',
      '.next/',
      '**/*.d.ts',
      '**/*.config.{js,ts}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '.next/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/*.test.{js,ts,tsx}',
        'src/test/**',
        'prisma/**',
      ],
      include: [
        'src/app/**/*.{js,ts,tsx}',
        'src/components/**/*.{js,ts,tsx}',
        'src/lib/**/*.{js,ts,tsx}',
      ],
      thresholds: {
        global: {
          branches: 60,
          functions: 60,
          lines: 60,
          statements: 60,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  css: {
    // Enable source maps for SASS (matching sassOptions.sourceMap: true in next.config)
    devSourcemap: true,
  },
});
