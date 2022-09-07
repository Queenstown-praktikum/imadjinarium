const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index');

class User extends Model {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
  },
);

module.exports = {
  User,
};
