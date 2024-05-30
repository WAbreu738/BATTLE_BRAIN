import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      _id
      username
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages {
    getMessages {
      id
      text
      user {
        _id
        username
      }
    }
  }
`;
