import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", 'prettier'),
  prettier,
  {
    rules: {
      // https://github.com/typescript-eslint/typescript-eslint/issues/2621
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          vars: 'all',
          caughtErrors: 'none',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_'
        }
      ],
      //'prettier/prettier': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false
        }
      ],
      // so I can do `while (true)`
      'no-constant-condition': 'off',
      // treats <script> tags as functions or something and complains
      // all functions are inner-ly declared
      'no-inner-declarations': 'off',
      // caught by other stuff and is too sensitive (e.g. `App`)
      'no-undef': 'off',
      // doesn't like namespaces for some reason
      // (see this: https://stackoverflow.com/questions/58270901)
      '@typescript-eslint/no-namespace': 'off',
      // just kinda useful sometimes
      '@typescript-eslint/no-empty-function': 'off'
    }
  }
];

export default eslintConfig;
