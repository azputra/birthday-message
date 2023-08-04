'use strict'

const { User } = require('../models')
const formatEmail = require('../helpers/formatEmail');
const {Op} = require('sequelize');

class UserController {
    static async getAllUser(req, res, next) {
        User.findAll({
            where:{deletedAt: null}
        }).then((users) => {
            res.status(200).json(users)
        }).catch(next);
    }

    static async insertUser(req, res, next) { 
        let {firstName, lastName, birthday, location, email } = req.body
        formatEmail(res, email)
        User.findOne({
            where: {
                email: email,
                [Op.and]: [{ deletedAt: null }],
            }
        })
        .then((dataUser) => {
            if (dataUser) next({status: 400, success: false, message: 'User Already Registerd'})
            User.create({
                firstName,
                lastName,
                birthday,
                location, 
                email,
                createdAt: new Date()
            }).then((user) => {
                res.status(201).json(user)
            }).catch(next);
        }).catch(next);
    }

    static async updateUser(req, res, next) {
        const { idUser } = req.params;
        let {firstName, lastName, birthday, location, email, phone } = req.body
        User.findOne({
            where: {
                id: idUser,
                [Op.and]: [{ deletedAt: null }],
            }
        })
        .then((dataBeforeUpdate) => {
            if (email === dataBeforeUpdate.email) {
                User.update({ 
                    firstName,
                    lastName,
                    birthday,
                    location, 
                    phone,
                    updatedAt: new Date(),
                }, {
                    where: {
                        id: idUser,
                        [Op.and]: [{ deletedAt: null }],
                    }
                }).then(() => {
                    User.findOne({
                        where: {
                            id: idUser,
                            [Op.and]: [{ deletedAt: null }],
                        }
                    })
                    .then((dataAfterUpdate) => {
                        res.status(200).json(dataAfterUpdate)
                    }).catch(next)
                }).catch(next)
            } else {
                User.update({ 
                    firstName,
                    lastName,
                    birthday,
                    location, 
                    phone,
                    email,
                    updatedAt: new Date()
                }, {
                    where: {
                        id: idUser,
                        [Op.and]: [{ deletedAt: null }],
                    }
                }).then(() => {
                    User.findOne({
                        where: {
                            id: idUser,
                            [Op.and]: [{ deletedAt: null }],
                        }
                    })
                    .then((dataAfterUpdate) => {
                        res.status(200).json(dataAfterUpdate)
                    }).catch(next)
                }).catch(next)
            }
        }).catch(next);
    }

    static async removeUser(req, res, next) {
        const { idUser } = req.params;
        User.findOne({
            where: {
                id: idUser,
            }
        }).then((detailUser) => {
            if (detailUser.deletedAt) next({status: 200, success: false, message: 'User Already Deleted Before'})
            User.update({ 
                deletedAt: new Date()
            }, {
                where: {
                    id: idUser,
                    [Op.and]: [{ deletedAt: null }],
                }
            }).then(() => {
                User.findOne({
                    where: {
                        id: idUser,
                    }
                })
                .then((dataAfterDeleted) => {
                    res.status(200).json(dataAfterDeleted)
                }).catch(next)
            }).catch(next)
        }).catch(next);
    }
}
module.exports = UserController