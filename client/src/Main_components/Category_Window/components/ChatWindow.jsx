import { useEffect, useState } from "react";
import { useQuery, useMutation, gql, useSubscription } from "@apollo/client";
// import { GET_MESSAGES } from "../../../graphql/queries";
// import { POST_MESSAGE } from "../../../graphql/mutations";
import { useStore } from "../../OptionsProvider";
import { MESSAGE_ADDED } from "../../../graphql/subscriptions";
import "./chat.css";

// import { gql } from "@apollo/client";

//  TODO LIST:
/*
show username in the chat
fix the first onclick bug
make it refetch better somehow 
*/

export default function ChatWindow() {
  // const [formData, setFormData] = useState({ text: "", username: "" });
  // const { loading, error, data } = useQuery(GET_MESSAGES);
  // const { loading: messageLoading, data: messageData } =
  //   useSubscription(MESSAGE_ADDED);
  const { state } = useStore();

  // useEffect(() => {
  //   console.log(messageLoading, messageData);
  // }, [messageLoading, messageData]);

  // const [postMessage] = useMutation(POST_MESSAGE, {
  //   variables: formData,
  //   refetchQueries: [{ query: GET_MESSAGES }],
  // });

  // // const [createPost] = useMutation(CREATE_POST, {
  // //   variables: formData,
  // //   refetchQueries: [GET_POSTS],
  // // });

  // // if (loading) return <p>Loading...</p>;
  // if (error) return console.error(error);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const text = e.target.elements.text.value;

  //   console.log("testing data:", data);

  //   // console.log("state correct value? ", state.user.username);

  //   const username = state.user.username; //add authentica and refer userid from it
  //   // console.log(username);
  //   setFormData({ text, username });

  //   // console.log("userId", username);
  //   try {
  //     const data = await postMessage({ variables: { text, username } });
  //     console.log("data", data);
  //     // console.error(
  //     //   "Uncaught TypeError: Cannot read property getMessage of undefined. Validation Error: 201456"
  //     // );
  //   } catch (error) {
  //     console.error("Failed to post message", error);
  //   }
  // };

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
