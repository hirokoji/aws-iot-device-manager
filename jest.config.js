module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    testMatch:[ "**/__tests__/**/*.ts"],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/']
};
