'use strict';
import { Model, DataTypes } from "sequelize"
import initBranch from "./branch"


export default (sequelize) => {
  const Branch = initBranch(sequelize)
  class Meal extends Model {
    associate = function(models) {
      // associations can be defined here
      
    };
  }
  Meal.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING(250),
    },
    branch_id:{
        type:DataTypes.INTEGER,
        references: {
            model: Branch,
            key: 'id'
        }
    },
    createdAt:{
      type:DataTypes.DATE,
      defaultValue:new Date()
    },
    updatedAt:{
      type:DataTypes.DATE,
      allowNull:true
    }
  },{
    modelName:"Meal",
    tableName:"meals",
    sequelize:sequelize
  });

  return Meal
}