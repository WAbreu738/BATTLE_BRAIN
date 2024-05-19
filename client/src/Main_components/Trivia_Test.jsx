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
    <>
      <div className="flex flex-col items-center mt-40">
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

      <div className="flex -space-x-2 justify-center mt-40 p-3">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </>
  );
};

export default TriviaComponent;
