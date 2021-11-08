const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: "Please provide a category name",
    unique: "Category already exists!",
  },
  description: {
    type: String,
    required: "Please provide a description",
  },
  articles: [
  {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },
],
});

const Category = model('Category', categorySchema);

module.exports = Category;
