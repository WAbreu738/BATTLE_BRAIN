import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import HomeBtn from "../HomeBtn";
import BackBtn from "../BackBtn";
import { NavLink } from "react-router-dom";
import leaderboard from "../../assets/images/LEADERBOARD.png";
import { GET_LEADERBOARD } from "../../graphql/queries";

export default function Leaderboards() {
  const { loading, error, data } = useQuery(GET_LEADERBOARD, {
    pollInterval: 3000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  const players = data.getLeaderboard
    ? data.getLeaderboard
        .filter(
          (player) =>
            player.highScore !== null && player.highScore !== undefined
        )
        .slice()
        .sort((a, b) => b.highScore - a.highScore)
    : [];

  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-3">
        <img className="h-28" src={leaderboard} alt="Leaderboard" />
      </div>

      <div className=" relative bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-lg w-fit">
        <div className="flex flex-col items-center">
          <div className="overflow-y-auto">
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
        </div>

        <div className="absolute -top-5 -right-5">
          <HomeBtn />
        </div>
        <div className="absolute -top-5 -left-5">
          <BackBtn />
        </div>
      </div>
    </div>
  );
}
