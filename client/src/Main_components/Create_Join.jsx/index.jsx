import React, { useEffect, useState } from "react";
import RoomCode from "./components/roomcode";
import HomeBtn from "../HomeBtn";
import CreateBtn from "./components/CreateBtn";
import BackBtn from "../BackBtn";
import { NavLink } from "react-router-dom";
import battleRoom from "../../assets/images/BATTLE-ROOM.png";

export default function JoinCreate() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-3">
        <img className="h-28" src={battleRoom} alt="BattleRoom" />
      </div>

      <div className=" relative bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <div className="flex flex-col items-center">
          <p className="font-bold mb-3">Join a room</p>
          <RoomCode />
          <p className="font-bold mb-3">or</p>
          <CreateBtn />
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
