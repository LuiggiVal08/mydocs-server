import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: 'gmail',
    port: 587,
    auth: {
        user: '',
        pass: '',
    },
});

export const htmlToken = (username: string, token: string): string => {
    return `
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Restablecer Contraseña</title>
    </head>
    <body
        style="
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        ">
        <div
            style="
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 400px;
                width: 100%;
                text-align: center;
            ">
            <h1 style="color: #4caf50">Hola ${username},</h1>
            <p style="font-size: 16px; margin: 10px 0">
                Recibimos una solicitud para restablecer tu contraseña. Usa el siguiente token para completar el
                proceso:
            </p>
            <p style="font-size: 18px; font-weight: bold; color: #ff5722">Token: ${token}</p>
            <p style="font-size: 16px; margin: 10px 0">Si no solicitaste esto, por favor ignora este correo.</p>
            <div style="font-size: 12px; margin-top: 20px">
                <p>&copy; 2025 Mi Empresa</p>
            </div>
        </div>
    </body>
</html>
`;
};

export default transporter;
