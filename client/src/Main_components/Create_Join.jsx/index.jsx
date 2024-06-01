import React, { useEffect, useState } from "react";
import RoomCode from "./components/roomcode";
import HomeBtn from "../HomeBtn";
import CreateBtn from "./components/CreateBtn";
import BackBtn from "../BackBtn";
import { NavLink } from "react-router-dom";

export default function JoinCreate() {
  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className=" relative bg-cyan-600 bg-opacity-90 shadow-lg rounded-xl p-8 max-w-lg w-full">
        <RoomCode />
        <CreateBtn />

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
