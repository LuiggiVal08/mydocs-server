import os from 'node:os';
import { argv } from 'node:process';
/**
 * Retrieves the IPv4 addresses of the server interfaces.
 *
 * @returns An array of strings representing the IPv4 addresses of the server interfaces.
 */
export const getServerAddresses = (): string[] => {
    try {
        if (!argv.includes('--host')) {
            return [];
        }

        const networkInterfaces = os.networkInterfaces();
        const addresses: string[] = [];
        for (const interfaceName of Object.keys(networkInterfaces)) {
            const interfaceInfo: os.NetworkInterfaceInfo[] | undefined = networkInterfaces[interfaceName];
            if (interfaceInfo) {
                const ips = interfaceInfo
                    .filter((info: os.NetworkInterfaceInfo) => info.family === 'IPv4' && !info.internal)
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
