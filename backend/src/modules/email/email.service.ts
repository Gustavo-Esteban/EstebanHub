import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendLeadNotification(lead: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
  }): Promise<void> {
    const notificationEmail = this.configService.get('NOTIFICATION_EMAIL');
    const emailFrom = this.configService.get('EMAIL_FROM');
    const resendApiKey = this.configService.get('RESEND_API_KEY');

    if (!notificationEmail || !emailFrom) {
      console.error('Email configuration is missing NOTIFICATION_EMAIL or EMAIL_FROM');
      return;
    }

    if (resendApiKey) {
      await this.sendWithResend(lead, notificationEmail, emailFrom);
      return;
    }

    const mailOptions = {
      from: emailFrom,
      to: notificationEmail,
      subject: `🔔 Novo Lead: ${lead.name}`,
      html: this.getLeadNotificationTemplate(lead),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${notificationEmail} for lead: ${lead.name}`);
    } catch (error) {
      console.error('Error sending email via SMTP:', error);
    }
  }

  private async sendWithResend(
    lead: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      message?: string;
    },
    notificationEmail: string,
    emailFrom: string,
  ): Promise<void> {
    const apiKey = this.configService.get('RESEND_API_KEY');

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return;
    }

    const payload = {
      from: emailFrom,
      to: [notificationEmail],
      subject: `🔔 Novo Lead: ${lead.name}`,
      html: this.getLeadNotificationTemplate(lead),
    };

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Error sending email via Resend:', response.status, text);
        return;
      }

      console.log(`Email sent via Resend to ${notificationEmail} for lead: ${lead.name}`);
    } catch (error) {
      console.error('Error sending email via Resend:', error);
    }
  }

  private getLeadNotificationTemplate(lead: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
  }): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #667eea;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎯 Novo Lead Recebido!</h1>
            <p>EstebanHub - Sistema de Gestão de Leads</p>
          </div>

          <div class="content">
            <div class="field">
              <div class="label">👤 Nome:</div>
              <div class="value">${lead.name}</div>
            </div>

            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
            </div>

            ${
              lead.phone
                ? `
            <div class="field">
              <div class="label">📱 Telefone:</div>
              <div class="value">${lead.phone}</div>
            </div>
            `
                : ''
            }

            ${
              lead.company
                ? `
            <div class="field">
              <div class="label">🏢 Empresa:</div>
              <div class="value">${lead.company}</div>
            </div>
            `
                : ''
            }

            ${
              lead.message
                ? `
            <div class="field">
              <div class="label">💬 Mensagem:</div>
              <div class="value">${lead.message}</div>
            </div>
            `
                : ''
            }

            <div style="margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: #1976d2;">
                <strong>⚡ Ação Recomendada:</strong><br>
                Responda em até 24 horas para maximizar as chances de conversão!
              </p>
            </div>
          </div>

          <div class="footer">
            <p>Este email foi enviado automaticamente pelo sistema EstebanHub.</p>
            <p>Para gerenciar leads, acesse o painel administrativo.</p>
          </div>
        </body>
      </html>
    `;
  }
}
