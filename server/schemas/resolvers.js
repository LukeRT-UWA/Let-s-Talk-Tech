const { Category, Article, User } = require('../models');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find({});
    },
    articles: async () => {
      return Article.find({})
    },
    //need to feed ID and serch by ID
    article: async () => {
      return Article.find({});
    },
  },
};

module.exports = resolvers;
