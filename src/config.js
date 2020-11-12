export default {
  API_ENDPOINT: process.env.REACT_APP_SERVER_URL || 'http://localhost:8001/api',
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'blogful-client-auth-token',
}
