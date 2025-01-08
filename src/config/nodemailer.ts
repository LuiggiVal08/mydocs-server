import { createTransport } from 'nodemailer';

const transporter = createTransport({
    host: 'gmail',
    port: 587,
    auth: {
        user: '',
        pass: '',
    },
});

export default transporter;
