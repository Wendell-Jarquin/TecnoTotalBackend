import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chowduarte@gmail.com',
      pass: 'auie zpuy dgcs fayp',
    },
  });

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'chowduarte@gmail.com',
      to,
      subject,
      text,
      html, // agrega el campo html
    };

    return this.transporter.sendMail(mailOptions);
  }
}
