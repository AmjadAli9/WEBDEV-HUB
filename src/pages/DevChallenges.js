import React, { useState } from "react";
import "./DevChallenges.css";
import { useNavigate } from "react-router-dom";

const challenges = [
  // Easy (Sample - Add 22 more)
  {
    title: "Live Character Counter",
    difficulty: "Easy",
    tags: ["JavaScript", "DOM", "Frontend"],
    description: "Create a textarea that displays remaining characters out of 200. Disable submit if limit exceeded.",
    solutionLink: "https://codesandbox.io/s/character-counter-demo"
  },
  {
    title: "Palindrome Checker",
    difficulty: "Easy",
    tags: ["JS", "String"],
    description: "Build a function that checks if a given string is a palindrome.",
    solutionLink: "https://codesandbox.io/s/palindrome-checker"
  },
  {
    title: "Simple Calculator",
    difficulty: "Easy",
    tags: ["HTML", "JS", "DOM"],
    description: "Create a calculator that supports basic operations like add, subtract, multiply, divide.",
    solutionLink: "https://codesandbox.io/s/simple-calculator"
  },
  {
    title: "To-Do List",
    difficulty: "Easy", 
    tags: ["HTML", "JS", "DOM"],
    description: "Build a simple to-do list app where users can add, remove, and mark tasks as complete.",
    solutionLink: "https://codesandbox.io/s/todo-list-app"
  },
  {
    title: "Random Quote Generator",
    difficulty: "Easy",
    tags: ["JavaScript", "API"],
    description: "Create a web app that fetches and displays a random quote from an API.",
    solutionLink: "https://codesandbox.io/s/random-quote-generator"
  },
  {
    title: "Image Gallery",
    difficulty: "Easy",
    tags: ["HTML", "CSS", "JS"],
    description: "Build a simple image gallery that displays images in a grid layout with hover effects.",
    solutionLink: "https://codesandbox.io/s/image-gallery"
  },
  {
    title: "Simple Form Validation",
    difficulty: "Easy",
    tags: ["HTML", "JS", "Form"],
    description: "Create a form with validation that checks if fields are filled out correctly before submission.",
    solutionLink: "https://codesandbox.io/s/form-validation-example"
  },
  {
    title: "Color Picker",
    difficulty: "Easy",
    tags: ["HTML", "CSS", "JS"],
    description: "Build a color picker that allows users to select a color and displays the selected color.",
    solutionLink: "https://codesandbox.io/s/color-picker"
  },
  {
    title: "Countdown Timer",
    difficulty: "Easy",
    tags: ["JavaScript", "DOM"],
    description: "Create a countdown timer that counts down from a specified time and displays the remaining time.",
    solutionLink: "https://codesandbox.io/s/countdown-timer"
  },
  // Medium (Sample - Add 22 more)
  {
    title: "Theme Toggle (Dark/Light)",
    difficulty: "Medium",
    tags: ["React", "CSS", "UI"],
    description: "Build a toggle switch that changes theme between dark and light mode.",
    solutionLink: "https://codesandbox.io/s/react-theme-toggle"
  },
  {
    title: "Pagination Component",
    difficulty: "Medium",
    tags: ["React", "Pagination"],
    description: "Create a reusable pagination component that supports page navigation.",
    solutionLink: "https://codesandbox.io/s/pagination-component"
  },
  {
    title: "Responsive Navbar",
    difficulty: "Medium",
    tags: ["CSS", "HTML", "JS"],
    description: "Build a responsive navbar with mobile menu toggle.",
    solutionLink: "https://codesandbox.io/s/responsive-navbar"
  },
  {
    title: "Expense Tracker",
    difficulty: "Medium",
    tags: ["React", "State Management"],
    description: "Create an expense tracker app to add, remove, and view expenses.",
    solutionLink: "https://codesandbox.io/s/expense-tracker"
  },
  {
    title: "Markdown Previewer",
    difficulty: "Medium",
    tags: ["React", "Markdown"],
    description: "Build a markdown previewer that converts markdown text to HTML.",
    solutionLink: "https://codesandbox.io/s/markdown-previewer"
  },
  {
    title: "Weather App",
    difficulty: "Medium",
    tags: ["React", "API", "Async"],
    description: "Create a weather app that fetches current weather data from an API based on user input.",
    solutionLink: "https://codesandbox.io/s/weather-app"
  },
  // Hard (Sample - Add 22 more)
  {
    title: "API Weather Fetcher",
    difficulty: "Hard",
    tags: ["React", "API", "Async"],
    description: "Build an app to fetch current weather by city using OpenWeather API.",
    solutionLink: "https://codesandbox.io/s/weather-api-react"
  },
  {
    title: "Real-time Chat App",
    difficulty: "Hard",
    tags: ["WebSocket", "Fullstack"],
    description: "Create a basic chat app with WebSocket support.",
    solutionLink: "https://codesandbox.io/s/realtime-chat"
  },
  {
    title: "Authentication Flow",
    difficulty: "Hard",
    tags: ["React", "JWT", "Auth"],
    description: "Implement login/logout using JWT and protect routes.",
    solutionLink: "https://codesandbox.io/s/jwt-auth-flow"
  },
  {
    title: "Drag and Drop Todo List",
    difficulty: "Hard",
    tags: ["React", "Drag and Drop"],
    description: "Create a todo list app with drag-and-drop functionality.",
    solutionLink: "https://codesandbox.io/s/drag-drop-todo"
  },
  {
    title: "Customizable Dashboard",
    difficulty: "Hard",
    tags: ["React", "Dashboard", "UI"],
    description: "Build a dashboard with customizable widgets and layout.",
    solutionLink: "https://codesandbox.io/s/custom-dashboard"
  }
];

function DevChallenges() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const handleCodePad = () => {
    navigate("/codepad");
  };

  const filteredChallenges =
    filter === "All"
      ? challenges
      : challenges.filter((c) => c.difficulty === filter);

  return (
    <div className="dev-challenges-page">
      <h1>💻 Daily Dev Challenges</h1>
      <p>Sharpen your skills with real-world web development problems. Filter by difficulty and click a challenge to begin!</p>

      <div className="filter-buttons">
        {['All', 'Easy', 'Medium', 'Hard'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`filter-btn ${filter === level ? "active" : ""}`}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="challenges-list">
        {filteredChallenges.map((challenge, index) => (
          <div
            key={index}
            className={`challenge-card ${selected === index ? "active" : ""}`}
            onClick={() => setSelected(index)}
          >
            <h2>{challenge.title}</h2>
            <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
            <p className="tags">Tags: {challenge.tags.join(", ")}</p>
            <p className="desc">{challenge.description}</p>
            <div className="btns">
              <button onClick={handleCodePad}>🚀 Try in CodePad</button>
              <a href={challenge.solutionLink} target="_blank" rel="noopener noreferrer">
                📘 View Solution
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevChallenges;
