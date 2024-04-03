import nodemailer, { Transporter } from 'nodemailer'
import { config } from 'dotenv'

config()

class MailService {
    private transporter: Transporter // Transporter instance

    constructor() {
        this.transporter = nodemailer.createTransport({ // Init of Transport object
            service: 'gmail',
            host: process.env.SMTP_HOST as string, // SMTP host
            port: 587, // Port
            secure: true, // Secure
            auth: {
                user: process.env.SMTP_USER as string, // Your email
                pass: process.env.SMTP_PASSWORD as string // Its password
            }
        })
    }


    async sendActivationMail(to: string, link: string) { // Sending mail
        await this.transporter.sendMail({ // Sending the mail to the user
            from: process.env.SMTP_USER, // From who
            to, // To
            subject: 'REVITUP: please activate your account', // Subject of the mail
            text: '', // Text of the mail
            html: // Rendered HTML with activation link
            `
                <div>
                    <h1>Please activate your account on REVITUP for access to motorsport news in one place</h1>
                    <a href="${link}">"${link}"</a>
                </div>
            `
        })
    }
}

export default new MailService()