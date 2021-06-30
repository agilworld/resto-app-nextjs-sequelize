'use strict';
const { DataTypes } = require('sequelize');
const { daysInWeek } = require("../config/constants")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.createTable('plans', {
        id: {
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        branch_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          index:true
        },
        meal_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          index:true
        },
        user_id:{
          type:DataTypes.INTEGER.UNSIGNED,
          allowNull:true,
          index:true
        },
        max: DataTypes.SMALLINT,
        date:DataTypes.DATEONLY,
        price: {
          type:DataTypes.DOUBLE,
          defaultValue:0.00
        },
        day: DataTypes.ENUM([
          daysInWeek.MONDAY,
          daysInWeek.TUESDAY,
          daysInWeek.WEDNESDAY,
          daysInWeek.THURSDAY,
          daysInWeek.FRIDAY,
          daysInWeek.SATURDAY,
          daysInWeek.SUNDAY
        ]),
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
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

     await queryInterface.dropTable('plans');
  }
};
