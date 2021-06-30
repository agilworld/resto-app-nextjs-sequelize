'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.createTable('meals', {
        id: {
          type:DataTypes.INTEGER.UNSIGNED,
          primaryKey:true,
          autoIncrement:true
        },
        branch_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          index:true
        },
        name:DataTypes.STRING(120),
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

     await queryInterface.dropTable('meals');
  }
};
