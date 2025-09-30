// Example senders. Replace with Twilio or real SMTP in production.
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  if (!process.env.SMTP_HOST) {
    console.log("[sendEmail] SMTP not configured — logging instead:");
    console.log({ to, subject, text });
    return true;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
  return true;
}

async function sendSmsViaTwilio(to, body) {
  // Placeholder. If TWILIO_SID/AUTH_TOKEN present, implement Twilio REST API call.
  if (!process.env.TWILIO_SID) {
    console.log("[sendSmsViaTwilio] Twilio not configured — logging instead:");
    console.log({ to, body });
    return true;
  }

  // Example: you'd use twilio npm to send
  // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({ body, from: process.env.TWILIO_FROM, to });

  return true;
}

module.exports = { sendEmail, sendSmsViaTwilio };
