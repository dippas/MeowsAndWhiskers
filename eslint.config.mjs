import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  {
    ignores: ['**/*.d.ts']
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ),
  {
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': [
        'error',
        {
          allow: ['error', 'warn', 'info']
        }
      ],

      'import/named': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports'
        }
      ]
    }
  }
];

export default eslintConfig;
