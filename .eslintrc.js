module.exports = {
  'extends': 'next/core-web-vitals',
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'indent': [
      'error',
      4,
      {
        'SwitchCase': 1,
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-indent': 'error',
    'react/jsx-indent-props': ['error', 4],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-sort-props': ['error', {
      'reservedFirst': true,
    }],
    'react/jsx-tag-spacing': ['error', {
      'beforeSelfClosing': 'always',
      'beforeClosing': 'never',
    }],
    'react/jsx-wrap-multilines': ['error', {
      'declaration': 'parens-new-line',
      'assignment': 'parens-new-line',
      'return': 'parens-new-line',
      'arrow': 'parens-new-line',
    }],
    'newline-before-return': 'error',
    'no-multiple-empty-lines': 'error',
    'no-trailing-spaces': 'error',
    'no-undef': 'error',
    'no-unused-vars': 'off',
    'quotes': ['error', 'single'],
    'semi': [
      'error',
      'never',
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        'groups': [
          'external',
          'builtin',
          'internal',
        ],
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': [
          'react',
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': [
      2,
      {
        'allow': [
          'warn',
          'error',
        ],
      },
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'none',
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        'before': false,
        'after': true,
        'overrides': {
          'arrow': {
            'before': true,
            'after': true,
          },
        },
      },
    ],
  },
}
