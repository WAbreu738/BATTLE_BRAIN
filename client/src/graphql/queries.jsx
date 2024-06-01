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

export const POLL_GAME = gql`
  query pollGame {
    pollGame {
      _id
      playerOne
      playerTwo
      chats
      winner
    }
  }
`;
