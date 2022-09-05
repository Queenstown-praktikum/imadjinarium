const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index');

class Post extends Model {}
Post.init(
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
  Post,
};
