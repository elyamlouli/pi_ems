import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { omit, Omit } from 'lodash';
import User from '../entity/User';
import { userRepository } from '../repositories';

export async function createUser(input: DeepPartial<User>): Promise<Omit<User, 'password'>> {
    try {
        const user = userRepository.create(input);
        const res = await userRepository.save(user);
        return omit(res, 'password');
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({
    email,
    password
}: {
    email: string,
    password: string
}): Promise<Omit<User, 'password'> | false> {
    const user = await userRepository.findOneBy({ email: email });
    if (!user) { return false; }

    const isValid = await user.comparePassword(password);
    if (!isValid) { return false; }

    return omit(user, 'password')
}

export async function findUser(query: FindOptionsWhere<User>) {
    return userRepository.findOneBy(query);
}