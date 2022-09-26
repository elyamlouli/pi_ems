import dotenv from 'dotenv';
dotenv.config();

const config = {
    db: {
        port: Number(process.env.DB_PORT),
        username: String(process.env.DB_USER),
        password: String(process.env.DB_PASSWORD),
        host: String(process.env.DB_HOST),
        database: String(process.env.DB_NAME),
    },
    server: {
        port: Number(process.env.SERVER_PORT)
    },
    bcrypt: {
        saltWorkFactor: 10,
    },
    jwt: {
        accessTokenPublicKey: String(process.env.ACCESS_PUBLIC_KEY),
        accessTokenPrivateKey: String(process.env.ACCESS_PRIVATE_KEY),
        refreshTokenPublicKey: String(process.env.REFRESH_PUBLIC_KEY),
        refreshTokenPrivateKey: String(process.env.REFRESH_PRIVATE_KEY),
        accessTokenTtl: '15m',
        refreshTokenTtl: '1y',
    }
};

export default config;