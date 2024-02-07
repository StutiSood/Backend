let nodemailer = require('nodemailer');


async function sendMail(emailId){

    const transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:"stutisood008@gmail.com",
            pass:"quzu ryai qefj crju" //app password
        },
    });
    const info=await transporter.sendMail({
        from : "stutisood008@gmail.com", //sender
        to : emailId, //receiver
        subject:"User Created!!",
        text:"Welcome",
        html:"<b>Welcome user. Thankyou for registering!!</b>",
    });
}

module.exports = sendMail;