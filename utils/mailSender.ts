import nodemailer from "nodemailer";

const mailSender = async (email: string, title: string, body: string) => {
  try {
    const contactEmailOptions = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_FROM_EMAIL,
        pass: process.env.SMTP_FROM_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(contactEmailOptions);

    // Send emails to users
    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error:any) {
    console.log(error.message);
  }
};

export default mailSender;
