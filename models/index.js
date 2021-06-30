'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const models = process.cwd() + '/models/' || __dirname;

import initBranch from "./branch"
import initMeal from "./meal"

let sequelize;
if (config.dialect=='sqlite') {
  sequelize = new Sequelize(`sqlite:${config.storage}`);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const branch = initBranch(sequelize)
const meal = initMeal(sequelize)

branch.hasMany(meal, { foreignKey: 'branch_id' })

const db = {
  branch,
  meal
}


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db
