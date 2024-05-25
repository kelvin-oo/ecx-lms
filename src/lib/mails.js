import nodemailer from "nodemailer";

export async function sendVerificationMail(email, token) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const confirmLink = `https://ecx-lms.vercel.app/auth/new-verification?token=${token}`;
  console.log(email, token);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "confirmation Email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}


