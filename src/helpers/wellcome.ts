import { colors } from '@/constants';

const { cyan, reset } = colors;
export const asciiArt = `
██║   ██║██║   ██║   ${cyan}██████║     ████║     ██████║  ███████║ ${reset}
███║ ███║ ██║ ██╔    ${cyan}██╔══██║  ██╔═══██║  ██╔═══██║██ ╔════╝${reset}
██╔██╔██║   ██╔╝     ${cyan}██║   ██║██╝     ██║███╝       ███████  ${reset}
██║   ██║   ██║      ${cyan}██║  ██╔  ██║   ██╔  ██║   ██║ ════╝ ██║ ${reset}
██║   ██║   ██║      ${cyan}██████╔╝    ████╔═╝   ██████╔╝ ███████╔╝ ${reset}
╚═╝   ╚═╝   ╚═╝      ${cyan}╚═════╝     ╚═══╝     ╚═════╝  ╚══════╝${reset}
`;

/**
 * Clears the console, sets the process title to 'MyDocs', and displays a styled ASCII art text using specific colors for the characters.
 */
// export default (): void => {
//     // console.clear();
//     process.stdout.write('\x1Bc');
//     try {
//         process.title = 'MyDocs';
//     } catch (error) {
//         console.error('Error setting process title:', error);
//     }
//     console.log(asciiArt);
// };
