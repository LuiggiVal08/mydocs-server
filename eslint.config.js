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
            'no-unused-vars': 'off', // Desactivar la regla de JS
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    args: 'after-used',
                    ignoreRestSiblings: false,
                },
            ],
        },
    },
];
