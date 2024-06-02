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

//

export const UPDATE_SCORE = gql`
  mutation updateHighScore($highScore: Int!) {
    updateHighScore(highScore: $highScore) {
      highScore
    }
  }
`;

//join_game , postChat, attack,

export const CREATE_GAME = gql`
  mutation createGame {
    createGame {
      _id
      playerOne {
        player {
          _id
        }
      }
    }
  }
`;

export const JOIN_GAME = gql`
  mutation joinGame($gameId: ID) {
    joinGame(gameId: $gameId) {
      _id
    }
  }
`;

export const START_GAME = gql`
  mutation startGame($gameId: ID, $startGame: Boolean) {
    startGame(gameId: $gameId, startGame: $startGame)
  }
`;

export const START_BATTLE = gql`
  mutation startBattle($gameId: ID, $startBattle: Boolean) {
    startBattle(gameId: $gameId, startBattle: $startBattle)
  }
`;

export const POST_CHAT = gql`
  mutation postChat($text: String!, $gameId: String!) {
    postChat(text: $text, gameId: $gameId) {
      _id
      text
      username
    }
  }
`;

export const GAME_SETTINGS = gql`
  mutation gameSettings($gameId: ID, $category: String, $difficulty: String) {
    gameSettings(
      gameId: $gameId
      category: $category
      difficulty: $difficulty
    ) {
      category
      difficulty
    }
  }
`;

export const CURRENT_QUESTION = gql`
  mutation currentQuestion($gameId: ID) {
    currentQuestion(gameId: $gameId)
  }
`;

export const ATTACK = gql`
  mutation attack(
    $gameId: String!
    $isCorrect: Boolean
    $amount: Int
    $winner: Boolean
  ) {
    attack(
      gameId: $gameId
      isCorrect: $isCorrect
      amount: $amount
      winner: $winner
    ) {
      _id
      isCorrect
      amount
      winner
    }
  }
`;

//  export const POST_MESSAGE = gql`
//    mutation postMessage($text: String!, $username: String!) {
//     postMessage(text: $text, username: $username) {
//        id
//        text
//       username
//     }
//   }
// `;
