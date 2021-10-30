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
  Mutation: {
    createCategory: async (parent, args) => {
      const category = await Category.create(args);
      return category
    },
    createArticle: async (parent, args) => {
      const article = await Category.create(args)
      return article
    },
    createComment: async (parent, args) => {
      const comment = await Comment.create(args)
      return comment
    },
  }
};

module.exports = resolvers;
