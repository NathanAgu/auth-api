const winston = require('winston');

/**
 * Configuration du logger
 * @module Logger
 */
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} ${level}: ${message}`;
                })
            )
        }),
        // File transport for errors
        new winston.transports.File({ 
            filename: process.env.LOG_FILE || 'error.log',
            level: 'error'
        })
    ]
});

// Add stream for Morgan
logger.stream = {
    write: (message) => logger.info(message.trim())
};

module.exports = logger;