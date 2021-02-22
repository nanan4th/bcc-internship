const { Sequelize } = require('sequelize')
const env = process.env

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    operatorsAliases: false,

    pool: {
        max: 3,
        min: 0,
        idle: 3000,
        acquire: 10000
    }
})

const tweets = require('./tweet.model')(sequelize, Sequelize)
const users = require('./user.model')(sequelize,Sequelize)

users.hasMany(tweets, {as: "tweets", onDelete: "cascade", onUpdate: "cascade"})
tweets.belongsTo(users, {foreignKey: "userId", as : "user"})

module.exports = {
    Sequelize,
    sequelize,
    //defining models
    tweets,
    //defining users
    users
}