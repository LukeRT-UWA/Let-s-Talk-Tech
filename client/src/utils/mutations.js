import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation createCategory($name: String!, $description: String!) {
    createCategory(name: $name, description: $description) {
      _id
      name
      description
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation createArticle($categoryId: ID!, $title: String!, $link: String!, $description: String!) {
    createArticle(categoryId: $categoryId, title: $title, link: $link, description: $description) {
      _id
      title
      link
      description
    }
  }
`;


