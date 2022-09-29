import configService from '@services/ConfigService';

import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} desde ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'PUT':
            return updateAdminPassword(request, response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function updateAdminPassword(request, response) {
    logger.info('Petición de cambio de contraseña');
    
    const result = await configService.updateAdminPassword(request.body);

    const responseCode = result.success ? '201' : '400';
    response.status(responseCode)
        .json(result);
}