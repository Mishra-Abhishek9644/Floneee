import nodemailer from "nodemailer";

export const sendResetEmail = async (
  to: string,
  resetLink: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Fashion Era" <${process.env.MAIL_USER}>`,
    to,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below (valid for 15 minutes):</p>
      <a href="${resetLink}">${resetLink}</a>
      <br/><br/>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
};
