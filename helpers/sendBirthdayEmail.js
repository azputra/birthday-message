'use strict'
const axios = require('axios');

function sendBirthdayEmail(email, message) {
    try {
        let data = JSON.stringify({
            "email": email,
            "message": message
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.API_EMAIL_SERVICE}/send-email`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };
        axios.request(config)
        .then((response) => {
            console.log('Email sent:', response.data);
        }).catch((err) => {
            if (err.response.status === 502 || err.response.status === 500) {
                console.log('Error sending email, Resend Email')
                sendBirthdayEmail(email, message)
            }
            console.error('Error sending email:', err.response.status);    
        });
    } catch (error) {
        if (error.response.status === 502 || error.response.status === 500) {
            console.log('Error sending email, Resend Email')
            sendBirthdayEmail(email, message)
        }
        console.error('Error sending email:', error.response.status);
    }
}

module.exports = sendBirthdayEmail