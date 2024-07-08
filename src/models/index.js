const User = require('./user')
const Blog = require('./blog')
const ReadingListBlog = require('./reading_list_blog')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingListBlog, as: 'reading_list' })
Blog.belongsToMany(User, { through: ReadingListBlog, as: 'reading_list' })

module.exports = {
  User,
  Blog,
  ReadingListBlog,
}