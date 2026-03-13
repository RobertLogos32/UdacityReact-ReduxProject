module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/test/**/*.test.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!(redux-thunk|@testing-library|react-redux|react-router-dom|react-router|redux)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
