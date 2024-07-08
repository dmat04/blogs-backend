const User = require('./user')
const Blog = require('./blog')
const ReadingListBlog = require('./reading_list_blog')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingListBlog, as: 'blogs_to_read' })
Blog.belongsToMany(User, { through: ReadingListBlog, as: 'part_of_reading_lists' })

module.exports = {
  User,
  Blog,
  ReadingListBlog,
}