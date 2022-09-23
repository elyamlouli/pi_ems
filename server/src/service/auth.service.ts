import { FindManyOptions, FindOptionsWhere, DeepPartial } from 'typeorm';
import { get } from 'lodash';
import { sessionRepository, userRepository } from '../repositories';
import Session from '../entity/Session';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';
import config from '../config';


export async function createSession(userId: number, userAgent: string) {
    const user = await userRepository.findOneByOrFail({ id: userId })
    const session = sessionRepository.create({
        user,
        userAgent,
    });
    return sessionRepository.save(session);
}

export async function findSessions(query: FindManyOptions<Session>) {
    return sessionRepository.find(query);
}

export async function updateSession(query: FindOptionsWhere<Session>, update: DeepPartial<Session>) {
    return sessionRepository.update(query, update)
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
    const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');

    if (!decoded || !get(decoded, 'session')) { return false; }

    const session = await sessionRepository.findOneBy({ id: get(decoded, 'session') });

    if (!session || !session.valid) { return false; }

    const user = await findUser({ id: session.userId });

    if (!user) { return false; }

    const accessToken = signJwt(
        { ...user, session: session.id },
        'accessTokenPrivateKey',
        { expiresIn: config.jwt.refreshTokenTtl }
    );

    return accessToken;
}