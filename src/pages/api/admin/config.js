import configService from '@services/ConfigService';

import logger from '@utils/Logger';

export default async function handler(request, response) {
    logger.info(`${request.method} ${request.url} desde ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'PUT':
            return editConfig(request, response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

async function editConfig(request, response) {
    const config = request.body;
    logger.info('Petición de cambio de configuración: ' + JSON.stringify(config));

    await configService.editConfig(config);

    response.status('201')
        .json(config);
}