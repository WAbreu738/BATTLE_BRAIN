import React from "react";
import { useQuery } from "@apollo/client";
import { GET_LEADERBOARD } from "../../../graphql/queries";
import leaderboard from "../../../assets/images/LEADERBOARD.png";
import { NavLink } from "react-router-dom";

const Leaderboard = () => {
  const { loading, error, data } = useQuery(GET_LEADERBOARD, {
    pollInterval: 3000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // console.log("Loading:", loading);
  // console.log("Error:", error);
  // console.log("Data:", data);

  const players = data.getLeaderboard
    ? data.getLeaderboard
        .slice()
        .sort((a, b) => b.highScore - a.highScore)
        .slice(0, 5)
    : [];

  return (
    <div>
      <div className="flex flex-col justify-center w-fit mx-auto">
        <h2 className="text-2xl font-bold mt-4 mb-4 w-fit mx-auto">
          TOP PLAYERS
        </h2>
        <ul>
          {players.map((player, index) => (
            <li key={index} className="flex items-center mb-2">
              <h1 className="mr-2 text-xl">{index + 1}.</h1>
              <div className="w-12 h-12 bg-cyan-950 rounded-full flex items-center justify-center mr-4">
                <img
                  src={player.profile}
                  alt={`${player.username}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold">
                  {index === 0 && "👑"}
                  {player.username}
                  {index === 0 && "👑"}
                </span>
                <span>High Score: {player.highScore}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <NavLink
        to={`/leaderboard`}
        className="transition ease-in-out hover:scale-90 hover:drop-shadow-lg"
      >
        <img
          src={leaderboard}
          alt="battle button"
          className=" w-fit transition ease-in-out hover:scale-90 hover:drop-shadow-lg"
        />
      </NavLink>
    </div>
  );
};

export default Leaderboard;
