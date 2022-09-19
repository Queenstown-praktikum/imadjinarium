const { Sequelize } = require('sequelize');

// todo: вынести в env file и добавить в docker-compose
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'postgres_imadjinarium',
  username: 'queenstown',
  password: 'queenstown',
  port: 5432,
  database: 'postgres_imadjinarium',
  dialectOptions: {
    ssl: false,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  connection,
};
