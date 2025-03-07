const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Creates a relationship between User and Post model, with the User having a "has many" relationship with Post model.
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Comment model, with the User having a "has many" relationship with Comment model.
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Post model, with a "belongs to" relationship of the Post to the User.
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between Post and Comment model, with the Post having a "has many" relationship with Comment model.
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between Comment and User model, with a "belongs to" relationship of the Comment to the User.
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between Comment and Post model, with a "belongs to" relationship of the Comment to the Post.
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
