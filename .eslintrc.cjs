module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'plugin:promise/recommended'],
  overrides: [
    {
      files: ['*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:jsdoc/recommended',
      ],
      plugins: [],
      rules: {
        'no-shadow': 'off',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
        ],
        'brace-style': ['error', '1tbs'],
        eqeqeq: 'error',
        'keyword-spacing': [2, { before: true, after: true }],
        'lines-between-class-members': 'error',
        'max-len': [
          'error',
          {
            code: 140,
            tabWidth: 2,
            ignorePattern: '^\\s*import ',
            ignoreUrls: true,
            ignoreRegExpLiterals: true,
          },
        ],
        'no-console': 'error',
        semi: 'error',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['react', 'promise'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
