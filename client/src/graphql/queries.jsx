import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  query Authenticate {
    authenticate {
      _id
      username
    }
  }
`;

export const GET_AVATAR = gql`
  query GetAvatar {
    getAvatar {
      profile
    }
  }
`;

// export const GET_MESSAGES = gql`
//   query GetMessages {
//     getMessages {
//       id
//       text
//       username
//     }
//   }
// `;

export const GET_STATS = gql`
  query GetStats {
    getStats {
      highScore
      gamesWon
      gamesLost
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    getLeaderboard {
      username
      profile
      highScore
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($gameId: ID) {
    getGame(gameId: $gameId) {
      _id
    }
  }
`;

export const POLL_GAME = gql`
  query pollGame($gameId: ID) {
    pollGame(gameId: $gameId) {
      _id
      playerOne {
        score
        player {
          _id
          username
          profile
        }
      }
      playerTwo {
        score
        player {
          _id
          username
          profile
        }
      }
      startGame
      startBattle
      isPlayerOneAnswered
      isPlayerTwoAnswered
      category
      difficulty
      chats {
        _id
        text
        username
      }
      winner {
        _id
        username
        profile
      }
      question {
        question
        correctAnswer
        incorrectAnswers
      }
    }
  }
`;
