import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_MESSAGES } from "../../graphql/queries";
import { POST_MESSAGE } from "../../graphql/mutations";
import { useStore } from "../OptionsProvider";
// import { gql } from "@apollo/client";

//  TODO LIST:
/*
show username in the chat
fix the first onclick bug
make it refetch better somehow 
*/

const ChatWindow = () => {
  const [formData, setFormData] = useState({ text: "", username: "" });
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const { state } = useStore();

  const [postMessage] = useMutation(POST_MESSAGE, {
    variables: formData,
    refetchQueries: [{ query: GET_MESSAGES }],
  });

  // const [createPost] = useMutation(CREATE_POST, {
  //   variables: formData,
  //   refetchQueries: [GET_POSTS],
  // });

  // if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value;

    console.log("testing data:", data);

    // console.log("state correct value? ", state.user.username);

    const username = state.user.username; //add authentica and refer userid from it
    console.log(username);
    setFormData({ text, username });

    console.log("userId", username);
    try {
      const data = await postMessage();
      console.log("data", data);
      // console.error(
      //   "Uncaught TypeError: Cannot read property getMessage of undefined. Validation Error: 201456"
      // );
    } catch (error) {
      console.error("Failed to post message", error);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred: {error.message}</p>}
      {!loading && !error && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              className="text-black"
              name="text"
              type="text"
              placeholder="Enter message..."
            />
            <button type="submit">Send</button>
          </form>
          <ul>
            {data?.getMessages.map(({ text, id }) => (
              <li key={id}>{text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
