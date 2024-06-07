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
    <div className="flex flex-col items-center justify-center md:mt-5 mt-3">
      <h2 className="mb-5 md:text-4xl text-xl font-bold text-center px-3 py-2 rounded-xl text-zinc-900 bg-gray-100 border border-zinc-900 w-full">
        {question}
      </h2>
      <div className="md:p-5 p-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-center">
          {shuffledAnswers.map((answer, index) => (
            <button
              className={`md:p-3 p-2 md:text-base text-sm border border-zinc-900 font-bold md:rounded-full rounded-xl flex justify-center items-center bg-gray-100 text-zinc-900 md:min-w-72 min-w-64 md:max-w-72 max-w-64 transition ease-in-out hover:scale-105 
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
