import { Request, Response } from 'express';
import { get } from 'lodash';
import { createSession, findSessions, refreshAccessToken, updateSession } from '../service/auth.service';
import { validatePassword } from '../service/user.service';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import config from '../config';
import { CreateSessionInput } from '../schema/session.schema';

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    // validate user password
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // create session
    const session = await createSession(user.id, req.get('user-agent') || '');

    // create an acces token
    const accessToken = signJwt(
        { ...user, session: session.id },
        'accessTokenPrivateKey',
        { expiresIn: config.jwt.accessTokenTtl }
    );

    // create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session.id },
        'refreshTokenPrivateKey',
        { expiresIn: config.jwt.refreshTokenTtl }
    );

    // return access and refresh token
    return res.send({ accessToken, refreshToken });
}

export async function getSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;

    const sessions = await findSessions({ where: { user: { id: userId }, valid: true } });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, 'headers.x-refresh');
    if (!refreshToken) {
        return res.status(400).send('Could not refresh access token');
    }

    const accessToken = await refreshAccessToken(refreshToken);
    if (!accessToken) {
        return res.status(400).send('Could not refresh access token');
    }

    return res.status(200).send({ accessToken });
}