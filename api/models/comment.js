const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index');

class Comment extends Model {}
Comment.init(
  {
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
  },
);

module.exports = {
  Comment,
};
