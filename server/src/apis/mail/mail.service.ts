import { Injectable } from "@nestjs/common";
import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";

interface EmailOptions {
    to: string,
    subject: string,
    html: string,
}

@Injectable()
export class MailService {

    private transporter: Mail;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "leprintemps7637@gmail.com",
                pass: "fwkhknwplgmyohob"
            }
        })
    }

    // 메일발송
    async sendMail(to: string, subject: string, html: string) {
        const mailOptions : EmailOptions = {
            to,
            subject,
            html,
        }

        return await this.transporter.sendMail(mailOptions);
    }
}