import {Sequelize} from "sequelize";
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

interface DB {
    [key: string]:any
}
const db:DB = {}

let sequelize:any;
if (config.dialect=='sqlite') {
  sequelize = new Sequelize(`sqlite:${config.storage}`);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file:any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file:any) => {
    const model:any = sequelize['import'](path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
/*
db.sequelize = sequelize
db.Sequelize = Sequelize
*/
export default db

