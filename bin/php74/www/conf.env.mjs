const isDev = process.env.NODE_ENV !== 'production'

export const projectName = 'Twins'
export const projectProdDomain = 'up-twins.ru'
// pg-test servet
//export const backendTestServer = 'https://9d6adc06-ebb1-4be9-86b5-ecdfe4701fc7.mock.pstmn.io'

export const backendTestServer = 'http://127.0.0.1:3002'
// Postman mock server
//export const backendMockServer = 'https://9d6adc06-ebb1-4be9-86b5-ecdfe4701fc7.mock.pstmn.io'
export const backendMockServer = 'https://3230dcf9-ba57-447d-ac66-0715a9efc31d.mock.pstmn.io'
// Forward non-existent pg-test requests to postman mock server
export const usePostmanMock = isDev && true
