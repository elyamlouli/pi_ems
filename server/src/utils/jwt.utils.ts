import jwt from 'jsonwebtoken'
import config from '../config'

export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
) {
    const privateKey = config.jwt[keyName];
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
}

export function verifyJwt(token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey") {
    try {
        const publicKey =  config.jwt[keyName];
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        }
    }
}