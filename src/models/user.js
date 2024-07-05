const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    }
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
})

module.exports = User