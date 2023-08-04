"use strict"

require('dotenv').config()
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const bodyParser = require("body-parser")
const errorHandler = require("./middlewares/errorHandler")
const cron = require('cron');
const sendBirthdayEmail = require('./helpers/sendBirthdayEmail')
const getUserWithBirthday = require('./helpers/getUserWithBirthday')

app.use(cors('*'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

const birthdayCronJob = new cron.CronJob('0 9 * * *', async () => {
    try {
        const today = new Date();
        const usersWithBirthday = await getUserWithBirthday(today);
        for (const user of usersWithBirthday) {
            const message = `Hey, ${user.firstName} ${user.lastName}, it's your birthday`;
            await sendBirthdayEmail(user.email, message);
        }
    } catch (error) {
        console.error('Error processing cron job:', error);
    }
});

app.get('/', (req, res) => res.send('Welcome To Api'))
app.use("/api/v1", routes)
app.use(errorHandler)

birthdayCronJob.start();

module.exports = app