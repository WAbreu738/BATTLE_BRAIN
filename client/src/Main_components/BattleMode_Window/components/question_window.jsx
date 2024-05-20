import React, { useEffect, useState } from "react";

const Question = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const url =
        "https://the-trivia-api.com/v2/questions?limit=1&categories=science";
      const headers = {
        "X-API-Key": "Q6qDHeKAdmG77q5Eg7dSWAQT4",
      };

      try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
    const answers = [...incorrectAnswers, correctAnswer];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  return (
    <div>
      <div>
        {questions.map((question) => {
          const shuffledAnswers = shuffleAnswers(
            question.correctAnswer,
            question.incorrectAnswers
          );
          return (
            <li className="flex flex-col items-center mt-5" key={question.id}>
              {/* <p className="text-3xl">{question.category}</p>
              <p>Difficulty: {question.difficulty}</p> */}
              <h2 className="my-16 text-4xl">{question.question.text}</h2>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-5">
                  {shuffledAnswers.map((answer, index) => (
                    <div
                      className="p-3 border rounded-md flex justify-center items-center text-slate-950 min-w-72 max-w-72 bg-gray-300 "
                      key={index}
                    >
                      {answer === question.correctAnswer ? (
                        <strong>{answer}</strong>
                      ) : (
                        answer
                      )}
                      {/* <li key={index}>{answer}</li> */}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
