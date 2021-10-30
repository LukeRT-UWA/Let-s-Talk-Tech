const { Category, Article, User } = require('../models');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find({});
    },
    category: async (parent, { categoryId}) => {
      return Category.findOne({_id: categoryId});
    },
    articles: async () => {
      return Article.find({})
    },
    article: async (parent, { articleId }) => {
      return Article.findOne({_id: articleId});
    },
  },
};

module.exports = resolvers;
