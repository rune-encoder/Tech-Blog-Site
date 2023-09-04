// Import models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// User has many posts.
User.hasMany(Post, {
  foreignKey: "user_id",
});

// User has many comments.
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Posts belong to one user. 
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Posts have many comments.
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// Comments belong to one user.
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belong to one post. 
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = {
  User,
  Post,
  Comment
};
