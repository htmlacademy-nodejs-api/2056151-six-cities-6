import { Logger as PinoInstance, pino, transport } from 'pino';
import { injectable } from 'inversify';
import { resolve } from 'node:path';
import { Logger } from './logger.interface.js';
import { getCurrentModuleDIrectoryPath } from '../../helpers/index.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDIrectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        { target: 'pino/file', options: { destination }, level: 'debug' },
        { target: 'pino/file', options: {}, level: 'info' },
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created…');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
