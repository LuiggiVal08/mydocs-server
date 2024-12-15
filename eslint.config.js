const eslintPlugin = require('@typescript-eslint/eslint-plugin');

/** @type {import('eslint').Linter.Config[]} */
const config = [
    {
        ignores: ['dist/', 'node_modules/'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                jest: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPlugin,
        },
        rules: {
            'no-unused-vars': 'off', // Desactivar la regla de JS
            '@typescript-eslint/no-unused-vars': [
                'error',
                { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
            ],
        },

        files: ['*.ts', '*.tsx'],
    },
];

module.exports = config;
