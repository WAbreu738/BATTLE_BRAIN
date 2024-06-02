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
        player {
          _id
          username
          profile
        }
      }
      playerTwo {
        player {
          _id
          username
          profile
        }
      }
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
    }
  }
`;
