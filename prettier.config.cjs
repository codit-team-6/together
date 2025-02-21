/** @type {import("prettier").Config} */

const path = require('path');

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: true,
  parser: 'typescript',
  filepath: '',
  requirePragma: false,
  insertPragma: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.svg',
      options: {
        semi: false,
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'], // clsx를 사용하고 있으므로 추가
  tailwindConfig: path.join(__dirname, 'tailwind.config.ts'), // path를 제대로 인식하지 못 해 절대경로로 지정
};
