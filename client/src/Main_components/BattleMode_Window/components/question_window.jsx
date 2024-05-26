import React, { useEffect, useState } from "react";

const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
  const answers = [...incorrectAnswers, correctAnswer];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
};

const Question = ({ question, options, correctAnswer, handleAnswer, answerState }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const answerLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    setShuffledAnswers(shuffleAnswers(correctAnswer, options));
  }, [question, correctAnswer, options]);
  
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mb-5 p-5 bg-gray-700 rounded-md">
        <h2 className="my-4 text-4xl text-center">{question}</h2>
      </div>
      <div className="p-5 w-full">
        <div className="grid grid-cols-2 gap-5">
          {shuffledAnswers.map((answer, index) => (
            <button
              className={`p-3 border rounded-md flex justify-center items-center text-white min-w-72 max-w-72 
                ${answerState && answer === correctAnswer ? "bg-green-500 font-bold" : ""} 
                ${answerState && answer !== correctAnswer ? "bg-red-500" : ""}`}
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={!!answerState} // Disable buttons once an answer is selected
            >
              <span className="font-bold mr-2">{answerLabels[index]}:</span> {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
