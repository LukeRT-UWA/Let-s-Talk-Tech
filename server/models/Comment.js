const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  commentTitle: {
    type: String,
    required: true,
    unique: true,
  },
  commentText: {
    type: String,
    required: true,
  },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
