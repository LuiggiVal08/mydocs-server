// exposeHost.ts

import os from 'node:os';
import { argv } from 'node:process';
import { Server, IncomingMessage, ServerResponse } from 'node:http';
import { PORT } from '@/config';
import wellcome from '@/helpers/wellcome';
import logger from '@/config/logger';

// import { validConn } from '../config/db';

const PORT_SERVER: number = parseInt(PORT || '3360', 10);

export const getServerAddresses = (): string[] => {
    try {
        if (!argv.includes('--host')) {
            return [];
        }

        const networkInterfaces = os.networkInterfaces();
        const addresses: string[] = [];
        for (const interfaceName of Object.keys(networkInterfaces)) {
            const interfaceInfo: os.NetworkInterfaceInfo[] | undefined =
                networkInterfaces[interfaceName];
            if (interfaceInfo) {
                const ips = interfaceInfo
                    .filter(
                        (info: os.NetworkInterfaceInfo) =>
                            info.family === 'IPv4' && !info.internal,
                    )
                    .map((info: os.NetworkInterfaceInfo) => info.address);
                addresses.push(...ips);
            }
        }
        return addresses;
    } catch (error) {
        console.error(`Error accessing network interfaces: ${error}`);
        return [];
    }
};

export default async (
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    addresses: string[],
) => {
    // await validConn()
    wellcome();
    if (argv.includes('--host')) {
        logger.info(
            `El servidor está disponible en las siguientes direcciones: \n`,
        );
        // console.log(
        //     `Local:   - ${cyan}http://localhost:${reset}${colors.white}${PORT_Server}${reset}`,
        // );
        type address = {
            type: string;
            dir: string;
        };
        let addressesTransform: address[] = [
            {
                type: 'Local',
                dir: `http://localhost:${PORT_SERVER}`,
            },
        ];

        addresses.forEach((address: string) => {
            // console.log(
            //     `Network: - ${cyan}http://${address}:${reset}${colors.white}${PORT_Server}${reset} `,
            // );

            addressesTransform.push({
                type: 'Network',
                dir: `http://${address}:${PORT_SERVER}`,
            });
        });

        console.table(addressesTransform);

        return server.listen(PORT_SERVER, '0.0.0.0', () => {
            logger.info(`Server Listener on Port ${PORT_SERVER}`);
        });
    } else {
        return server.listen(PORT_SERVER, () => {
            logger.info(
                `El servidor está disponible en las siguiente dirección: \n`,
            );
            console.table([
                {
                    type: 'Local',
                    dir: `http://localhost:${PORT_SERVER}/`,
                },
            ]);
            logger.info(`Server Listener on Port ${PORT_SERVER}`);
        });
    }
};
