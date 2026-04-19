import React, { useEffect, useState } from "react";

function Results({ refresh, triggerRefresh }) {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("results")) || [];
    setResults(data);
  }, [refresh]); // 🔥 auto update

  const handleClear = () => {
    localStorage.removeItem("results");
    setResults([]);
    setShowResults(false);
    triggerRefresh(); // 🔥 sync analytics
  };

  return (
    <div className="card">
      <h2>Quiz Results</h2>

      <button onClick={() => setShowResults(!showResults)}>
        {showResults ? "Hide Results" : "View Results"}
      </button>

      {results.length > 0 && (
        <button onClick={handleClear} style={{ marginLeft: "10px" }}>
          Clear Results
        </button>
      )}

      {showResults && (
        <>
          {results.length === 0 ? (
            <p>No results yet</p>
          ) : (
            results.map((res, index) => (
              <div key={index} className="result-item">
                <p><strong>Date:</strong> {res.date}</p>
                <p><strong>Score:</strong> {res.score} / {res.total}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Results;