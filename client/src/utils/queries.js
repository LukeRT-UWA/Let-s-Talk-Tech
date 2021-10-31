import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql`
  query categories {
    categories {
      _id
      name
      description
    }
  }
`;

export const QUERY_CATEGORY = gql`
  query category($categoryId: ID!) {
    category(categoryId: $categoryId) {
      _id
      name
      description
    }
  }
`;

export const QUERY_ARTICLE = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const QUERY_COMMENT = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;
