// const resolve = require('resolve')

const path = require('path');

// module.exports = {
//     roots: ['<rootDir>/src'],
//     testMatch: ['**/*.steps.ts'],
    // testEnvironment: resolve.sync('jest-environment-jsdom', {
    //   basedir: require.resolve('jest'),
    // })
// }
/** @returns {Promise<import('jest').Config>} */
// module.exports = async () => {
//   return {
//     verbose: true,
//   };
// };

module.exports = {
  // preset: "ts-jest",
  // testEnvironment: resolve.sync('jest-environment-jsdom', {
  //   basedir: require.resolve('jest'),
  // }),
  // using ts-jest
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //   "@testing-library/react/cleanup-after-each",
  //   "@testing-library/jest-dom/extend-expect"
  // ],
  // testEnvironment: 'jsdom',
  // testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/src'],
  // transform: { "\\.ts$": ["ts-jest"] },
  testMatch: ['**/*.test.tsx'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "feature"],
  // globals: {
  //   "ts-jest": {
  //     tsConfig: {
  //       // allow js in typescript
  //       allowJs: true,
  //     },
  //   },
  // },
  moduleDirectories: ['node_modules', path.join(__dirname, './src')],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve(
      'react-scripts/config/jest/babelTransform',
    ),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
      'react-scripts/config/jest/fileTransform.js',
    ),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  resetMocks: true,
};

