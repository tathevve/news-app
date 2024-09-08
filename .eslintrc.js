module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Add this line
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'], // Add 'prettier' plugin

  rules: {
    // Add your custom rules here
    'prettier/prettier': 'error', // Show prettier issues as errors
  },
  ignorePatterns: ['metro.config.js', 'jest.config.js'],
};
