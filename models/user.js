'use strict';
const {Op} = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please Fill Email"
        },
        notNull: {
          args: true,
          msg: "Please Enter Your Email"
        },
        isEmail: {
          args: true,
          msg: "Incorrect Format Email"
        },
        async isUnique(value) {
          const result = await User.findOne({
            where: {
              email: value,
              [Op.and]: [{ deletedAt: null }]
            }
          });
          if (result) {
            throw new Error("Email address already exist");
          }
        }
      },
    },
    birthday: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  User.associate = function (models) {
  };
  return User;
};