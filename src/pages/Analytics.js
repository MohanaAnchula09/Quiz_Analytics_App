import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from "recharts";

function Analytics({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    setData(results);
  }, [refresh]); // 🔥 sync automatically

  if (data.length === 0) {
    return (
      <div className="card">
        <h2>Analytics Dashboard</h2>
        <p>No data available. Complete a quiz.</p>
      </div>
    );
  }

  const lineData = data.map((item, index) => ({
    name: `Attempt ${index + 1}`,
    score: item.score
  }));

  const categoryMap = {};
  data.forEach(res => {
    res.details.forEach(q => {
      if (!categoryMap[q.category]) {
        categoryMap[q.category] = { correct: 0 };
      }
      if (q.selected === q.correct) {
        categoryMap[q.category].correct++;
      }
    });
  });

  const barData = Object.keys(categoryMap).map(key => ({
    category: key,
    score: categoryMap[key].correct
  }));

  const totalQuestions = data.reduce((sum, r) => sum + r.total, 0);
  const totalCorrect = data.reduce((sum, r) => sum + r.score, 0);

  const pieData = [
    { name: "Correct", value: totalCorrect },
    { name: "Wrong", value: totalQuestions - totalCorrect }
  ];

  return (
    <div className="card">
      <h2>Analytics Dashboard</h2>

      <div className="charts">

        <div className="chart-box">
          <h4>Score Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Category Performance</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h4>Accuracy</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80}>
                <Cell />
                <Cell />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Analytics;