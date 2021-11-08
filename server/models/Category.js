const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: "Please enter a valid category name",
    unique: "Category already exists!",
  },
  description: {
    type: String,
    required: "Please enter a valid description",
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
