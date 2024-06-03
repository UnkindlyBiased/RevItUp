import nodemailer, { Transporter } from 'nodemailer'

import env from '../../utils/EnvSchema'

class MailService {
    private transporter: Transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            secure: true,
            auth: {
                user: env.SMTP_USER, 
                pass: env.SMTP_PASSWORD
            }
        })
    }


    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: env.SMTP_USER,
            to,
            subject: 'REVITUP: please activate your account',
            text: '',
            html:
            `
                <div>
                    <h1>Please activate your account on REVITUP for access to motorsport news in one place</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }
}

export default MailService