'use strict'

function formatEmail(res, email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase()) === false) {
        res.status(400).json({ success: false, status: 400, message: 'Incorrect Format Email' })
    } else {
        return email
    } 
}

module.exports = formatEmail