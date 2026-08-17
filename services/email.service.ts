import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NODE_ENV } from "../config/env.js";

const transporter =
  NODE_ENV !== "test"
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  if (!transporter) {
    console.log("[Email] Skipped (no transporter in test mode):", options.subject);
    return;
  }

  await transporter.sendMail({
    from: SMTP_USER || "noreply@subtracker.com",
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};

export const sendRenewalReminder = async (
  email: string,
  subscriptionName: string,
  renewalDate: Date
): Promise<void> => {
  const formattedDate = renewalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await sendEmail({
    to: email,
    subject: `Renewal Reminder: ${subscriptionName}`,
    html: `
      <h2>Subscription Renewal Reminder</h2>
      <p>Your <strong>${subscriptionName}</strong> subscription is set to renew on <strong>${formattedDate}</strong>.</p>
      <p>Please ensure your payment method is up to date.</p>
      <br/>
      <p>— The Subscription Tracker Team</p>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  await sendEmail({
    to: email,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Use the token below to reset your password:</p>
      <p><strong>${resetToken}</strong></p>
      <p>This token expires in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
};
