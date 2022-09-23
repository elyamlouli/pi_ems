import appDataSource from '../data-source'
import logger from './logger'

async function connect() {
    try {
        await appDataSource.initialize()
        logger.info('DB Connected');
    } catch (error) {
        logger.error('Could not connect to db');
        process.exit(1);
    }
}

export default connect;