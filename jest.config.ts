/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest';

import type {Config} from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.tsx'],
};

export default createJestConfig(config);
