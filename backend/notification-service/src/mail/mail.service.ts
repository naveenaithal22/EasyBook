import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // e.g., smtp.gmail.com
      port: 587, // 465 for SSL, 587 for TLS
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.GMAIL_ID, // Use environment variable for security
        pass: process.env.GMAIL_PASS_KEY, // Use environment variable for security
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const info = await this.transporter.sendMail({
      from: '"EasyBook" <naveenkup97@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  }
}
