module.exports = {
    transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    },
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.js"
    ],
    moduleNameMapper: {
        "@services/(.*)": "<rootDir>/src/services/$1",
        "@clients/(.*)": "<rootDir>/src/clients/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
        "@config/(.*)": "<rootDir>/src/config/$1"
    }
}