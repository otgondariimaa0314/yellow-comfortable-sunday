const fs = require('fs');
const nodemailer = require('nodemailer');
const userStorage = require('../utils/storage.js');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASSWORD
    }
});

const checkList = async () => {
    // check if there is any request in pending list
    if(userStorage.pendingList.length > 0){
        console.log('length before:', userStorage.pendingList.length);
        const lengthSend = userStorage.pendingList.length;

        const lengthSent = await sendEmail(userStorage.pendingList, lengthSend);
        console.log('length:', lengthSent);

        // remove from pending request list
        userStorage.pendingList.splice(0, lengthSent);

        console.log('email send end', lengthSent);
    }
}

const getList = (list) => {

    // prepare list in text
    
    const text = list.map(item => {
        return `name: ${item.username}\naddress: ${item.address}\nwish: ${item.wish}\n----------------`;
    }).join('\n');
    console.log(text);
    return text;
}

const sendEmail = async (requests, length) => {
    try {
        console.log('email send start', requests);

    let mailContent = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'New requests',
        text: getList(requests)
    };

    await transporter.sendMail(mailContent);
    return length;
    } catch (error) {
        console.log("ERROR", error)
    }
}

module.exports = {checkList};