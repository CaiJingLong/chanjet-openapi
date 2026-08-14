import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      thresholds: {
        statements: 85,
        branches: 85,
        'src/auth/**/*.ts': { statements: 95, branches: 95 },
        'src/errors.ts': { statements: 95, branches: 95 },
        'src/client.ts': { statements: 95, branches: 95 },
      },
    },
  },
});
