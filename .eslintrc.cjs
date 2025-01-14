module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'tailwindcss', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    // 전역객체를 eslint가 인식하는 구간
    browser: true, // document나 window 인식되게 함
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/', 'prettier.config.cjs'], // eslint 미적용될 폴더나 파일 명시
  extends: [
    'airbnb',
    'airbnb-typescript',
    // 'airbnb/hooks',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', // ts 권장
    'plugin:prettier/recommended', // eslint의 포매팅을 prettier로 사용.
    'plugin:tailwindcss/recommended',
    'prettier', // eslint-config-prettier prettier와 중복된 eslint 규칙 제거
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off', // react 17부턴 import 안해도돼서 기능 끔
    // 경고표시, 파일 확장자를 .ts나 .tsx 모두 허용함
    'react/jsx-filename-extension': ['warn', {extensions: ['.ts', '.tsx']}],
    'no-useless-catch': 'off', // 불필요한 catch 못쓰게 하는 기능 끔
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    // import 정렬 순서
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
          },
          {
            pattern: '@/*',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react*'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        printWidth: 100,
        endOfLine: 'auto',
        bracketSpacing: false,
      },
    ],
  },
};
