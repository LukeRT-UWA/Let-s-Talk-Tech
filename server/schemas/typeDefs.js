const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID!
    name: String
    description: String
    articles: [Article]
  }

  type Article {
    _id: ID!
    categoryId: String
    title: String!
    link: String!
    description: String!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String
  }

  type Query {
    categories: [Category]
    category(categoryId: ID!): Category
    articles(categoryId: ID!): [Article]
    article(articleId: ID!): Article
    comments(articleId: ID!): [Comment]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createCategory(name: String!, description: String!): Category 
    createArticle(categoryId: String, title: String!, link: String!, description: String!): Article
    createComment(articleId: ID!, commentText: String!): Article
  }

`;


module.exports = typeDefs;
