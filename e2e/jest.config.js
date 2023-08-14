/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testRunner: 'jest-circus/runner',
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.e2e.ts*', '<rootDir>/e2e/**/*.test.js*'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
}
