const { Category, Article, User } = require('../models');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find({}).populate('articles');
    },
    category: async (parent, { categoryId}) => {
      return Category.findOne({_id: categoryId}).populate('articles');
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
      const article = await Article.create(args)
      return article
    },
    createComment: async (parent, { articleId, commentText }) => {
      return Article.findOneAndUpdate(
        { _id: articleId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  }
};

module.exports = resolvers;
