import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    env: {
      browser: true,
      es2022: true,
    },
    extends: ['prettier'],
    plugins: ['prettier'],
    rules: {
      '@typescript-eslint/indent': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 120,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          semi: true,
          jsxBracketSameLine: false,
        },
      ],
      'no-console': ['error', { allow: ['error'] }],
      'max-len': ['error', { code: 120 }],
    },
  }),
];

export default eslintConfig;
