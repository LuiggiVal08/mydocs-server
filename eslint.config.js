const eslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    {
        ignores: ['./dist', './node_modules', './tests'],
        files: ['src/**/*.ts'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2022,
            parser: typescriptParser,
            parserOptions: {
                project: './tsconfig.json',
            },
            globals: {
                browser: 'readonly',
                jest: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPlugin,
        },
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: 'warn',
        },
        rules: {
            'no-console': 'warn', // Advertir sobre el uso de console.log
            'prefer-const': 'warn', // Sugerir el uso de const cuando sea posible
            'no-var': 'error', // No permitir el uso de var
            semi: ['warn', 'always'], // Advertir si falta el punto y coma
            quotes: ['warn', 'single'], // Sugerir el uso de comillas simples
            'no-unused-vars': 'off', // Desactivar la regla de JS
            eqeqeq: ['warn', 'always'], // Sugerir el uso de === y !== en lugar de == y !=
            curly: ['warn', 'all'], // Sugerir el uso de llaves en bloques
            'no-trailing-spaces': 'warn', // Advertir sobre espacios en blanco al final de las líneas
            'eol-last': ['warn', 'always'], // Sugerir una nueva línea al final del archivo
            'no-multiple-empty-lines': ['warn', { max: 1 }], // Limitar líneas vacías consecutivas a una
            '@typescript-eslint/no-unnecessary-condition': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/no-magic-numbers': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                    argsIgnorePattern: '^_', // Ignorar argumentos que comienzan con _
                    varsIgnorePattern: '^_', // Ignorar variables que comienzan con _
                },
            ],
        },
    },
];
