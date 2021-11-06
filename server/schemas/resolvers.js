const { AuthenticationError } = require('apollo-server-express');
const { Category, Article, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find({}).populate('articles');
    },
    category: async (parent, { categoryId }) => {
      return Category.findOne({_id: categoryId}).populate('articles');
    },
    articles: async (parent, {categoryId}) => {
      return Article.find({categoryId}).populate('comments')
    },
    article: async (parent, { articleId }) => {
      return Article.findOne({_id: articleId}).populate('comments');
    },
  },
  Mutation: {
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, password }) => {
        const user = await User.create({ username, password });
        const token = signToken(user);
        return { token, user };
    },
    createCategory: async (parent, args) => {
      const category = await Category.create(args);
      return category
    },
    createArticle: async (parent, {title, link, description, categoryId}) => {
      const article = await Article.create({title, link, description, categoryId})
      
      await Category.findOneAndUpdate(
        {_id: categoryId},
        {$addToSet: { articles: article._id}}
      )
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
