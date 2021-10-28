const { Category, Article, User } = require('../models');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find({});
    },
    articles: async () => {
      Article.find({})
    },
    //need to feed ID and serch by ID
    article: async () => {
      return Article.find({});
    },
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
