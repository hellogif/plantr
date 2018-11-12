// const pg = require('pg');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {
    logging: false
})

module.exports = db;

const Gardener = db.define('gardeners', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const Plot = db.define('plots', {
    size: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    shaded: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

const Vegetable = db.define('vegetables', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    planted_on: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

Plot.belongsTo(Gardener);

Vegetable.belongsToMany(Plot, { through: 'plotable' });
Plot.belongsToMany(Vegetable, { through: 'plotable' });

Gardener.belongsTo(Vegetable, { as: `favorite_vegetable`});

