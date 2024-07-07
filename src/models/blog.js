const { DataTypes, Model, Op, fn } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  yearWritten: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      checkYearWritte: (value) => {
        if (value < 1991 || value > (new Date().getFullYear())) {
          throw new Error('blog.yearWritten must be between 1991 and current year')
        }
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog',
})

module.exports = Blog