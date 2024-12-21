"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
(0, node_process_1.loadEnvFile)();
const config = {
    testTimeout: 5000,
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@$': '<rootDir>/src',
        '^@pp/(.*)$': '<rootDir>/src/app/$1',
        '^@pp$': '<rootDir>/src/app',
        '^@prisma-client/(.*)$': '<rootDir>/node_modules/@prisma-client/$1',
    },
    rootDir: './',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    clearMocks: true,
    verbose: true,
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map