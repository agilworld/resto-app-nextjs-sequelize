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

      await queryInterface.createTable('distances', {
        user_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          primaryKey:true
        },
        branch_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          primaryKey:true
        },
        distance:{
          type:DataTypes.FLOAT,
          defaultValue:0.0
        },
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

     await queryInterface.dropTable('distances');
  }
};
