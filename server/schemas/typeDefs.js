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
    category(categoryId: ID!): Category
    articles: [Article]
    article(articleId: ID!): Article
  }

  type Mutation {
    createCategory(name: String!, description: String!): Category 
    createArticle(categoryId: ID!, title: String!, link: String!, description: String!): Article
    createComment(articleId: ID!, commentText: String!): Comment
  }

`;


module.exports = typeDefs;
