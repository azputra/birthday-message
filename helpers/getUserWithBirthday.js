'use strict'

const { Op, Sequelize } = require('sequelize');
const { User } = require('../models')

async function getUserWithBirthday(date) {
    try {
        const usersWithBirthday = await User.findAll({
            where: {
                [Op.and]: [
                    Sequelize.literal(`EXTRACT(MONTH FROM "birthday") = ${date.getMonth() + 1}`),
                    Sequelize.literal(`EXTRACT(DAY FROM "birthday") = ${date.getDate()}`),
                ],
                deletedAt: null,
            },
        });
        return usersWithBirthday;
    } catch (error) {
        console.error('Error getting users with birthday:', error);
        throw error;
    }
}

module.exports = getUserWithBirthday