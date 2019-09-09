const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'cota',
    'cota',
    'cotaatoc',
    {
        dialect: 'postgres',
        // host: 'banco'
        host: 'localhost'
    }
)

module.exports = sequelize


