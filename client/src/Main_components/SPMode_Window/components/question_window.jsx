import React, { useEffect, useState } from "react";

const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
  const answers = [...incorrectAnswers, correctAnswer];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
};

const Question = ({
  question,
  options,
  correctAnswer,
  handleAnswer,
  answerState,
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setShuffledAnswers(shuffleAnswers(correctAnswer, options));
  }, [question, correctAnswer, options]);

  return (
    <div className="flex flex-col items-center mt-5">
      <h2 className="mb-5 text-4xl text-center px-3 py-2 rounded-xl text-zinc-900 bg-gray-100 border border-zinc-900 w-full">
        {question}
      </h2>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-10">
          {shuffledAnswers.map((answer, index) => (
            <button
              className={`p-3 border border-zinc-900 font-bold rounded-full flex justify-center items-center bg-gray-100 text-zinc-900 min-w-72 max-w-72 transition ease-in-out hover:scale-105 
                ${
                  answerState && answer === correctAnswer ? "bg-green-500" : ""
                } 
                ${answerState && answer !== correctAnswer ? "bg-red-500" : ""}`}
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={!!answerState} // Disable buttons once an answer is selected
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
