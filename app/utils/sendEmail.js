const nodemailer = require("nodemailer");
const db =require("../model")
const User=db.users
const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: 'developer5gloryautotech@gmail.com',
                pass: 'Arti@321',
            },
            tls:{
                rejectUnauthorized:false
            }
        });



        await transporter.sendMail({
            from: 'developer5gloryautotech@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;