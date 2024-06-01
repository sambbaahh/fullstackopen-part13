const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list', {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'blogs',
          key: 'id',
        },
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_list');
  },
};
