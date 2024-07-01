const fs = require('fs');
const nodemailer = require('nodemailer');
const storage = require('../utils/storage.ts');

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
    if(storage.pendingList.length > 0){
        const length = await sendEmail(storage.pendingList);
        console.log('length:', length);

        // remove from pending request list
        storage.pendingList.splice(0, length);

        console.log('email send end', length);
    }
}

const getList = (list) => {

    // prepare list in text
    return list.map(item => {
        return `name: ${item.username}\naddress: ${item.address}\nwish: ${item.wish}\n----------------`;
    }).join('\n');
}

const sendEmail = async (requests) => {
    try {
        console.log('email send start', requests);

    let mailContent = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'New requests',
        text: getList(requests)
    };

    await transporter.sendMail(mailContent);
    return requests.length;
    } catch (error) {
        console.log("ERROR", error)
    }
}

module.exports = {checkList};