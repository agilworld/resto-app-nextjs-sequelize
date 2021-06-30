'use strict';
const {  DataTypes } = require('sequelize');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     */
     await queryInterface.createTable('branches', {
        id: {
          type:DataTypes.INTEGER.UNSIGNED,
          primaryKey:true,
          autoIncrement:true
        },
        name: DataTypes.STRING(250),
        lat: DataTypes.DOUBLE,
        lng: DataTypes.DOUBLE,
        open: DataTypes.TIME,
        close: DataTypes.TIME,
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
     */
    await queryInterface.dropTable('branches');

  }
};
