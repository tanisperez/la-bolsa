import configService from '@services/ConfigService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'GET':
            return getConfig(response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function getConfig(response) {
    const drinks = await configService.getConfig();
    response.status(200)
        .json(drinks);
}