import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM polyfill for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactMail(fromName: string, fromEmail: string, subjectLine: string, message: string) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP credentials not configured in server .env');
    }

    const mailOptions = {
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
      replyTo: fromEmail,
      subject: `[Contact Form] ${subjectLine || 'New inquiry from Audivio'}`,
      text: `Name: ${fromName}\nEmail: ${fromEmail}\nSubject: ${subjectLine}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C400FF;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fromName}</p>
          <p><strong>Email:</strong> ${fromEmail}</p>
          <p><strong>Subject:</strong> ${subjectLine}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">This email was sent from the Audivio contact form.</p>
        </div>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
