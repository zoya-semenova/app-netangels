class TokenManager {
    constructor() {
        this.tokenFile = path.join(__dirname, 'tokens.json');
        this.loadTokens();
    }
    loadTokens() {
        try {
            const data = fs.readFileSync(this.tokenFile, 'utf8');
            this.tokens = JSON.parse(data);
        } catch (error) {
            this.tokens = {};
        }
    }
    saveTokens() {
        fs.writeFileSync(this.tokenFile, JSON.stringify(this.tokens, null, 2));
    }
    async refreshToken(refreshToken) {
        try {
            const response = await axios.post('https://oauth.bitrix24.tech/oauth/token/', {
                grant_type: 'refresh_token',
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                refresh_token: refreshToken
            });
            this.tokens = response.data;
            this.saveTokens();
            return response.data;
        } catch (error) {
            throw new Error('Не удалось обновить токен: ' + error.message);
        }
    }
    getValidToken() {
// Проверка срока действия токена и обновление при необходимости
        const expiresAt = this.tokens.expires_at || 0;
        const now = Date.now() / 1000;
        if (now >= expiresAt - 300) { // Обновляем за 5 минут до истечения
            return this.refreshToken(this.tokens.refresh_token);
        }
        return Promise.resolve(this.tokens.access_token);
    }
}

export default TokenManager