module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'no-unused-vars': 'warn',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'no-use-before-define': ['error', { functions: false, classes: true }],
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
    },
}
