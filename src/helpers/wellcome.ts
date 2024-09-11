import { colors } from '@/config';

const { cyan, reset } = colors;
export default () => {
    console.clear();
    process.title = 'MyDocs';
    console.log(`
MM      MM MM    MM   ${cyan}MMMMMM      MMMM       MMMM      MMMMMM ${reset}
MMMM  MMMM  MM  MM    ${cyan}MM   MM   MM    MM   MM    MM   MM     M ${reset}
MM  MM  MM    MM      ${cyan}MM    MM MM      MM MM           MMMMMMM  ${reset}
MM      MM    MM      ${cyan}MM   MM   MM    MM   MM    MM   MM     MM ${reset}
MM      MM    MM      ${cyan}MMMMMM      MMMM       MMMM       MMMMM ${reset}
                `);
};
