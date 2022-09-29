import configService from '@services/ConfigService';
import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'POST':
            return login(request, response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function login(request, response) {
    const credentials = request.body;
    const adminPassword = await configService.getAdminPassword();

    if (credentials.user === 'admin' && credentials.password === adminPassword) {
        response.status(200).end();
    } else {
        response.status(403).end();
    }
}