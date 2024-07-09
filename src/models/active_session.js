const { DataTypes, Model, Op, fn } = require('sequelize')
const { sequelize } = require('../util/db')

class ActiveSession extends Model { }

ActiveSession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id'}
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'active_sessions',
})

module.exports = ActiveSession