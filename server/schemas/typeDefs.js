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
    name: String
    description: String
    articles: [Article]
  }

  type Article {
    _id: ID!
    categoryId: ID!
    title: String!
    link: String!
    description: String!
    comment: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String
    createdAt: String
  }

  type Query {
    categories: [Category]
    category(categoryId: ID!): Category
    articles(categoryId: ID!): [Article]
    article(articleId: ID!): Article
    comments(articleId: ID!): [Comment]
  }

  type Mutation {
    createCategory(name: String!, description: String!): Category 
    createArticle(categoryId: ID!, title: String!, link: String!, description: String!): Article
    createComment(articleId: ID!, commentText: String!): Article
  }

`;


module.exports = typeDefs;
