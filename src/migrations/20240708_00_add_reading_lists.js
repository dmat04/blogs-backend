const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list_blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    })

    await queryInterface.addConstraint('reading_list_blogs', {
      type: 'unique',
      name: 'reading_list_blogs_blog_id_user_id_uk',
      fields: ['blog_id', 'user_id'],
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_list_blogs', 'reading_list_blogs_blog_id_user_id_uk')
    await queryInterface.dropTable('reading_list_blogs')
  }
}