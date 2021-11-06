import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
mutation createCategory($name: String!, $description: String!) {
    createCategory(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const ADD_ARTICLE = gql`
mutation createArticle($categoryId: String, $title: String!, $link: String!, $description: String!) {
    createArticle(categoryId: $categoryId, title: $title, link: $link, description: $description) {
      _id
      categoryId
      title
      link
      description
    }
  }
`;

export const ADD_COMMENT = gql `
mutation createComment($articleId:ID!, $commentText:String!){
    createComment(articleId: $articleId, commentText:$commentText){
      _id
      title
      comments {
        _id
        commentText
      }
    }
  }
`


