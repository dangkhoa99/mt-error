import prettierPlugin from 'eslint-plugin-prettier/recommended';
import {
  plugin as tsEslintPlugin,
  parser as tsParser,
} from 'typescript-eslint';

export default [
  prettierPlugin,
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      curly: ['error', 'all'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I', 'MTError'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          custom: {
            regex:
              '^(T|Type|Any|Promise|Number|String|Object|Value)[A-Z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*(Type|Promise|Number|String|Object|Value|Like)$',
            match: true,
          },
        },
      ],
    },
  },
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/eslint.config.*',
      '**/*.d.ts',
    ],
  },
];
