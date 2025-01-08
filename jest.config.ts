import type { Config } from 'jest';
import { config as configEnv } from 'dotenv';
configEnv();

const config: Config = {
    testTimeout: 5000,
    testEnvironment: 'node',
    preset: 'ts-jest',
    testMatch: ['**/tests/**/*.test.ts'], // Ruta a tus archivos de test
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@$': '<rootDir>/src',
        '^@pp/(.*)$': '<rootDir>/src/app/$1',
        '^@pp$': '<rootDir>/src/app',
    },
    rootDir: './',
    transform: {
        '^.+\\.ts$': 'ts-jest', // Transforma archivos TypeScript
    },
    // Otras configuraciones opcionales
    collectCoverage: true, // Activa la recopilación de cobertura de pruebas
    coverageDirectory: 'coverage', // Directorio para los informes de cobertura
    coverageProvider: 'v8', // Proveedor de cobertura
    clearMocks: true, // Limpia los mocks automáticamente
    verbose: true, // Mostrar detalles de la ejecución,
    // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;
