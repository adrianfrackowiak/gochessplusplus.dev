import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 1. Zawsze końcowa pusta linia.
      '@stylistic/eol-last': ['error', 'always'],
      // 2. Wszędzie średniki.
      '@stylistic/semi': ['error', 'always'],
      // 3. Cudzysłowy zawsze pojedyncze ''.
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      // 4. Wszędzie spacje (np. import { Route, Routes }).
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-infix-ops': 'error',
      // Równe wcięcia (2 spacje).
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent-props': ['error', 2],
      // Kolejność importów.
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      // 5. Wszystko typujemy.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/typedef': ['error', {
        parameter: true,
        propertyDeclaration: true,
      }],
    },
  },
]);