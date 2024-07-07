const { DataTypes, fn, Op } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year_written', {
      type: DataTypes.INTEGER,
      allowNull: false,      
    })

    await queryInterface.addConstraint('blogs', {
      type: 'check',
      name: 'blogs_year_written_ck',
      fields: ['year_written'],
      where: {
        year_written: {
          [Op.and]: [
            { [Op.gte]: 1991 },
            { [Op.lte]: fn('date_part', 'year', fn('now'))}
          ]
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('blogs', 'blogs_year_written_ck')
    await queryInterface.removeColumn('blogs', 'year_written')
  }
}