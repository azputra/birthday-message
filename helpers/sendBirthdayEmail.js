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
        return axios.request(config)
        .then((response) => {
            // console.log('Email sent:', response.data);
            return {email: email, data : response.data}
        }).catch((err) => {
            if (err.response.status === 502 || err.response.status === 500) {
                console.log('Error sending email, Resend Email')
                sendBirthdayEmail(email, message)
            }
            console.error('Error sending email:', err.response.status);    
            return Promise.reject(err.response.status);
        });
    } catch (error) {
        if (error.response.status === 502 || error.response.status === 500) {
            console.log('Error sending email, Resend Email')
            sendBirthdayEmail(email, message)
        }
        console.error('Error sending email:', error.response.status);
        return Promise.reject(error.response.status);
    }
}

module.exports = sendBirthdayEmail