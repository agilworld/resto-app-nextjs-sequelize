'use strict';
import { Model, DataTypes } from "sequelize"

export default (sequelize) => {
  class Branch extends Model {}
  Branch.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING(250),
    },
    lat: {
      type:DataTypes.DOUBLE
    },
    lng: {
      type:DataTypes.DOUBLE
    },
    open: {
      type:DataTypes.TIME
    },
    close: {
      type:DataTypes.TIME
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
    modelName:"Branch",
    tableName:"branches",
    sequelize:sequelize
  });

  return Branch
}