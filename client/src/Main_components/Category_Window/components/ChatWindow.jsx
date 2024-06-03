import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useStore } from "../../OptionsProvider";
import "./chat.css";

export default function ChatWindow() {
  const { state } = useStore();

  return (
    <div className="p-5 m-5 bg-cyan-600 opacity-90 rounded-xl text-zinc-900 chat ">
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}
      {!loading && !error && (
        <> */}
      <form className="flex flex-col">
        <textarea
          className="px-0.5 py-1 rounded "
          name="text"
          type="text"
          rows={2}
          placeholder="Enter message..."
        ></textarea>
        <button type="submit" className="bg-gray-100 rounded mt-1">
          Send
        </button>
      </form>
      <ul className="mt-3 p-1 bg-gray-100 rounded text-sm overflow-y-auto chat-output ">
        {/* {data?.getMessages.map(({ text, username, id }) => (
          <li key={id}>
            {username}: {text}
          </li>
        ))} */}
      </ul>
      {/* </>
      )} */}
    </div>
  );
}
