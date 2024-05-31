import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    registerUser(username: $username, password: $password) {
      _id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      _id
      username
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const ADD_AVATAR = gql`
  mutation AddAvatar($profile: String!) {
    addAvatar(profile: $profile)
  }
`;

export const POST_MESSAGE = gql`
  mutation postMessage($text: String!, $username: String!) {
    postMessage(text: $text, username: $username) {
      id
      text
      username
    }
  }
`;

export const UPDATE_SCORE = gql`
  mutation updateHighScore($highScore: Int!) {
    updateHighScore(highScore: $highScore) {
      highScore
    }
  }
`;

/*
mutation POST_MESSAGE($text: String!, $username: String!) {
  postMessage(text: $text, username: $username) {
    id
    content
    author
  }
}
*/
