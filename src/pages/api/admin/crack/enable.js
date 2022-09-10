import marketService from '@services/MarketService';
import logger from '@utils/Logger';

export default function handler(request, response) {
    logger.info(`${request.method} ${request.url} from ${request.socket.remoteAddress}`);
    switch (request.method) {
        case 'PUT':
            return enableCrackMode(response);
        default:
            logger.info(`El método ${request.method} no está implementado`);
            return response.status(400).send('');
    }
}

function enableCrackMode(response) {
    marketService.enableCrackMode();
    response.status(200)
        .send();
}