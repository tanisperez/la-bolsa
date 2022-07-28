module.exports = {
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/src/setup.test.js"
    ],
    moduleNameMapper: {
        "@services/(.*)": "<rootDir>/src/services/$1",
        "@clients/(.*)": "<rootDir>/src/clients/$1"
    }
}