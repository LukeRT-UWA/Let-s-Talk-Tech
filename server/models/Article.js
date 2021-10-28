const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Article = model('Article', articleSchema);

module.exports = Article;
