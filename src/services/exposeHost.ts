import { Server, IncomingMessage, ServerResponse } from 'node:http';
import { colors, PORT } from '@/config';
import logger from '@/config/logger';
import { Application } from 'express';
import wellcome from '@/helpers/wellcome';

const PORT_SERVER: number = parseInt(PORT || '3000', 10);
/**
 * Asynchronously starts the server on specified addresses and logs the available server locations.
 * @param server The server instance to start
 * @param addresses Array of network addresses to log
 * @returns A promise that resolves when the server starts listening
 */
const exposeHost = async (
    server: Server<typeof IncomingMessage, typeof ServerResponse> | Application,
    addresses: string[] = [],
) => {
    let hostname = '::';
    if (addresses.length > 0) hostname = addresses[0];

    const serverListen = server.listen(PORT_SERVER, hostname, () => {
        wellcome();
        if (addresses.length > 0) {
            logger.info(`El servidor está disponible en las siguientes direcciones:`);
            logger.info(
                `Local:   - ${colors.cyan}http://localhost:${colors.reset}${colors.white}${PORT_SERVER}${colors.reset}`,
            );
            addresses.forEach((address: string) => {
                logger.info(
                    `Network: - ${colors.cyan}http://${address}:${colors.reset}${colors.white}${PORT_SERVER}${colors.reset}`,
                );
            });
        } else {
            logger.info(`El servidor está disponible en la siguiente dirección:`);
            logger.info(
                `Local:   - ${colors.cyan}http://localhost:${colors.reset}${colors.white}${PORT_SERVER}${colors.reset}`,
            );
        }
    });
    return serverListen;
};
export default exposeHost;
