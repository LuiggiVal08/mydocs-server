import { domain, MAIL } from '@/constants';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    host: 'gmail',
    port: 587,
    auth: {
        user: MAIL.MAIL_FROM_EMAIL,
        pass: MAIL.MAIL_PASSWORD,
    },
});
export const htmlContainer = (content: string, username: string, subject: string): string => {
    return `

    <div
        style="
            margin: 0;
            padding: 0;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;

        ">
        <div
            style="
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #fff;
                justify-content: center;
                align-items: center;
                margin: auto;
                border: 1px solid #dbdbdb;
                border-radius: 8px;
                padding: 20px;
                max-width: 500px;
                width: 100%;
            ">
            <div
                style="
                    text-align: center;
                    width: 100%;
                ">
                <header>
                    <div style="width:fit-content;margin: 0 auto;align-items: center; ">
                        <img
                            src="${domain}/images/logo.png"
                            alt="MyDocs"
                            style="display: block; margin: 0 auto; width: 60px" />
                    </div>
                    <h2 style="font-weight: 200; margin: 0">${subject}</h2>
                    <p>Hola, ${username}.</p>
                </header>
                <hr style="width: 100%; border: 1px solid #dbdbdb; border-top: none" />
                ${content}
                <hr style="width: 100%; border: 1px solid #dbdbdb; border-top: none" />
                <footer>
                    <small style="color: #6e6e6e">
                        &copy; ${new Date().getFullYear()} MyDocs. Todos los derechos reservados.
                    </small>
                </footer>
            </div>
        </div>
    </div>
    `;
};

export const htmlToken = (username: string, token: string, subject: string): string => {
    return `
    ${htmlContainer(
        `
            <main style="font-size: 1rem">
                <p>
                    Debes ingresar este token dentro de los 30 días posteriores
                    al registro para activar tu cuenta:
                </p>
                <b>Token : ${token} </b>
                <p>Si no solicitaste un token de seguridad, ignora este mensaje.</p>
            </main>
        `,
        username,
        subject,
    )}
    `;
};

export default transporter;
