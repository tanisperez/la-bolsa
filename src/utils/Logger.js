import log4js from 'log4js';

class Logger {
    constructor() {
        log4js.configure({
            appenders: {
                out: { 
                    type: 'stdout',
                    layout: {
                        type: 'pattern',
                        pattern: '%[[%p]%] %d{dd/MM/yyyy hh:mm:ss} - %m'
                    }
                }
            },
            categories: {
                default: { appenders: ['out'], level: 'info' },
            },
        });
        this.logger = log4js.getLogger();
        this.logger.level = 'info';
    }

    info(message) {
        this.logger.info(message);
    }

    error(message) {
        this.logger.error(message);
    }
}

export default new Logger();