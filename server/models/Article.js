const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: "Please enter a valid article name",
    unique: "Article already exists!",
  },
  link: {
    type: String,
    required: "Please provide a valid link",
    unique: true,
    match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 
    "Please enter a valid link"]
  },
  description: {
    type: String,
    required: "Please enter a valid description",
  },
  categoryId: {
    type: String,
    required: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: "Please enter a valid comment",
        minlength: 1,
        maxlength: [280, "Please enter a comment that is under 280 characters"]
      },
    },
  ],
});

const Article = model('Article', articleSchema);

module.exports = Article;
