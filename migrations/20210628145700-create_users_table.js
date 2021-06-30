'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.createTable('users', {
        id: {
          type:DataTypes.INTEGER.UNSIGNED,
          primaryKey:true,
          autoIncrement:true
        },
        name:DataTypes.STRING,
        phone_no:DataTypes.STRING(30),
        address:DataTypes.STRING(250),
        lat:DataTypes.DOUBLE,
        lng:DataTypes.DOUBLE,
        createdAt:{
          type:DataTypes.DATE,
          defaultValue:new Date()
        },
        updatedAt:{
          type:DataTypes.DATE,
          allowNull:true
        }
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('users');
  }
};
