import React, { useState } from "react";
import questions from "../data/questions";

function Quiz({ triggerRefresh }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [
      ...answers,
      {
        question: questions[current].question,
        selected: option,
        correct: questions[current].answer,
        category: questions[current].category
      }
    ];

    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      saveResult(newAnswers);
      setCompleted(true);
    }
  };

  const saveResult = (data) => {
    const existing = JSON.parse(localStorage.getItem("results")) || [];

    const newEntry = {
      date: new Date().toLocaleDateString(),
      score: data.filter(a => a.selected === a.correct).length,
      total: data.length,
      details: data
    };

    localStorage.setItem("results", JSON.stringify([...existing, newEntry]));

    triggerRefresh(); // 🔥 update all pages
  };

  if (completed) {
    return (
      <div className="card">
        <h2>Quiz Completed!</h2>
        <button
          onClick={() => {
            setCurrent(0);
            setAnswers([]);
            setCompleted(false);
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>{questions[current].question}</h2>

      {questions[current].options.map((opt, index) => (
        <button key={index} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Quiz;