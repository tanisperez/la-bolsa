import marketService from '@services/MarketService';
import logger from '@utils/Logger';

export default function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'GET':
            return getCrackModeStatus(response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

function getCrackModeStatus(response) {
    const status = marketService.getCrackModeStatus();
    response.status(200)
        .json(status);
}