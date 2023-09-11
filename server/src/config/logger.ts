import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';
import env from './env';

const { combine, timestamp, printf, colorize } = winston.format;

const logDirectory = path.join('logs', 'app-%DATE%.log');

const levelUppercase = winston.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: logDirectory,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: env.get('server.env') === 'development' ? 'debug' : 'info',
    format: combine(
        levelUppercase(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] [${level}]: ${message}`,
        ),
    ),
    silent: process.argv.includes('--silent'),
});

const consoleTransport = new winston.transports.Console({
    level: env.get('server.env') === 'development' ? 'debug' : 'info',
    format: combine(
        levelUppercase(),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        colorize({ all: true }),
        printf(
            ({ timestamp, level, message }) =>
                `[${timestamp}] [${level}]: ${message}`,
        ),
    ),
    silent: process.argv.includes('--silent'),
});

const transports =
    env.get('server.env') === 'development'
        ? [consoleTransport]
        : [fileRotateTransport, consoleTransport];

const logger = winston.createLogger({
    transports,
    exceptionHandlers: [consoleTransport],
});

export default logger;
