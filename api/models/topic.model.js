const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../index');

class TopicModel extends Model {}
TopicModel.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
  },
);

module.exports = {
  Topic: TopicModel,
};
