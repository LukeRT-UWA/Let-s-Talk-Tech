const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
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
