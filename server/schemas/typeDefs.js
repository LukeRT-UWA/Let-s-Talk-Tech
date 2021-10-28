const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }  

  type Category {
    _id: ID!
    name: String!
    description: String!
  }

  type Article {
    _id: ID!
    title: String!
    link: String!
    description: String!
  }

  type Comment {
    _id: ID!
    commentText: String
    createdAt: String
  }

  type Query {
    categories: [Category]
    article: [Article]
    article: Article
  }

  type Mutation {
    addCategory
    addArticle
    addComment
  }
`;

// article needs ID fed to it

module.exports = typeDefs;
