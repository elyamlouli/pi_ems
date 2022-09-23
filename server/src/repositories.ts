import appDataSource from "./data-source";
import Session from "./entity/Session";
import User from "./entity/User";

export const userRepository = appDataSource.getRepository(User);

export const sessionRepository = appDataSource.getRepository(Session);