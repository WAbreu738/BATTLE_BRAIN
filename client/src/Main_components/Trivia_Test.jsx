// import React, { useEffect, useState } from "react";

// const TriviaComponent = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const url = "https://the-trivia-api.com/v2/questions";
//       const headers = {
//         "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
//       };

//       try {
//         const response = await fetch(url, { headers: headers });
//         const data = await response.json();
//         setQuestions(data);
//       } catch (error) {
//         console.error("Error fetching trivia questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, []);

//   return (
//     <div>
//       <h1>Trivia Questions</h1>
//       <ul>
//         {questions.map((question) => (
//           <li key={question.id}>
//             <h2>{question.question.text}</h2>
//             <p>
//               <strong>Category:</strong> {question.category}
//             </p>
//             <p>
//               <strong>Difficulty:</strong> {question.difficulty}
//             </p>
//             <ul>
//               <li>{question.correctAnswer} (Correct Answer)</li>
//               {question.incorrectAnswers.map((answer, index) => (
//                 <li key={index}>{answer}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TriviaComponent;

import React, { useEffect, useState } from "react";

const TriviaComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("music"); // Default category
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchQuestions = async () => {
      const url = "https://the-trivia-api.com/v2/questions/search";
      const headers = {
        "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
        "Content-Type": "application/json",
      };

      const body = {
        categories: [category],
        difficulties: [difficulty],
        order: "new",
        pageNumber: 0,
        perPage: 50,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorText = await response.text(); // Read response as text
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Fetched questions:", data); // Debugging log
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
        setError(error.message); // Set error message
      }
    };

    fetchQuestions();
  }, [category, difficulty]); // Re-fetch if category or difficulty changes

  return (
    <div>
      <h1>Trivia Questions</h1>
      <div>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="music">Music</option>
            <option value="sport_and_leisure">Sport and Leisure</option>
            <option value="science">Science</option>
            {/* Add more categories as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}{" "}
      {/* Display error message */}
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h2>{question.question.text}</h2>
            <p>
              <strong>Category:</strong> {question.category}
            </p>
            <p>
              <strong>Difficulty:</strong> {question.difficulty}
            </p>
            <ul>
              <li>{question.correctAnswer} (Correct Answer)</li>
              {question.incorrectAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TriviaComponent;
