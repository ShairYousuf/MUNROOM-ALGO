/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  roots: ["<rootDir>/test"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
