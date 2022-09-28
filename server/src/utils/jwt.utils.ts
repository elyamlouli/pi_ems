import jwt from 'jsonwebtoken';
import config from '../config';

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
    const publicKey = config.jwt[keyName];
    try {
        const decoded = jwt.verify(token, publicKey);
        return decoded;
    } catch (e: any) {
        return null;
    }
}