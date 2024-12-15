import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `\n[${level}]: ${timestamp} | ${message}`;
});

// Configuración de Winston
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(), // Colorea los logs en la consola
        timestamp(), // Añade timestamp a los logs
        logFormat, // Usa el formato personalizado
    ),
    transports: [
        new winston.transports.Console(), // Log a la consola
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }), // Log de errores a un archivo
        new winston.transports.File({ filename: 'logs/combined.log' }), // Log combinado a un archivo
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
        }), // Log rotativo diario
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }), // Manejo de excepciones no capturadas
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: 'logs/rejections.log' }), // Manejo de promesas rechazadas no capturadas
    ],
});

export default logger;
