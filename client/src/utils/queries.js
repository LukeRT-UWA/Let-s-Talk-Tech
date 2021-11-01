import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
query categories {
    categories {
      _id
      name
      description
      articles {_id categoryId title link description}
    }
  }
`;

export const QUERY_CATEGORY = gql`
query category($categoryId: ID!) {
    category(categoryId: $categoryId) {
      _id
      name
      description
     	articles {
        _id
        categoryId
        title
      	link
      	description}
    }
  }
`;

export const QUERY_ARTICLES = gql`
query articles($categoryId: ID!){
    articles(categoryId: $categoryId){
      _id
      title
      link
      description
      comments {
        _id
        commentText
      }
    }
  }
`;
export const QUERY_ARTICLE = gql`
query article($articleId: ID!){
    article(articleId: $articleId){
      _id
      title
      link
      description
      comments {
        _id
        commentText
      }
    }
  }
`
export const QUERY_COMMENT = gql`
query comment($articleId:ID!){
    comments(articleId: $articleId) {
      _id
      commentText
    }
  }
`;
