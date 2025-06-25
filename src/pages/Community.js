import React, { useState } from "react";
import "./Community.css";

const CommunityPage = () => {
  const [projects, setProjects] = useState([
    { title: "Portfolio Website", description: "🎨 A stunning portfolio made with React and TailwindCSS!" },
    { title: "E-Commerce Store", description: "🛒 An online store with product filters, cart, and payment integration." },
  ]);

  const [discussions, setDiscussions] = useState([
    {
      question: "What’s the best way to learn Redux?",
      comments: ["📘 Try the official docs!", "🎥 I found a great YouTube playlist."],
    },
    {
      question: "Looking for collaborators on a React project",
      comments: ["🙋‍♂️ Count me in!", "💡 What’s the project idea?"],
    },
  ]);

  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [newDiscussion, setNewDiscussion] = useState("");

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (newProject.title.trim() && newProject.description.trim()) {
      setProjects([...projects, newProject]);
      setNewProject({ title: "", description: "" });
    }
  };

  const handleDiscussionSubmit = (e) => {
    e.preventDefault();
    if (newDiscussion.trim()) {
      setDiscussions([...discussions, { question: newDiscussion, comments: [] }]);
      setNewDiscussion("");
    }
  };

  const addComment = (index, comment) => {
    if (comment.trim()) {
      const updatedDiscussions = [...discussions];
      updatedDiscussions[index].comments.push(comment);
      setDiscussions(updatedDiscussions);
    }
  };

  return (
    <div className="community-page">
      <div className="community-container">
        <section className="inspiration-wall">
          <h2>🌟 Inspiration Wall</h2>
          <p>Fuel your creativity — read success stories, find project ideas, and stay motivated.</p>
          <div className="inspiration-content">
            <div className="story">
              <h3>🚀 From Zero to Web Dev Hero</h3>
              <p>Meet Aisha — she started learning web development six months ago and now builds amazing real-world projects.</p>
            </div>
            <div className="idea">
              <h3>💡 Project Idea: Task Tracker App</h3>
              <p>Build a sleek and efficient task management app using React and Firebase. Ready for the challenge?</p>
            </div>
          </div>
        </section>

        <section className="project-showcase">
          <h2>💻 Project Showcase</h2>
          <p>Check out community creations or share your own masterpiece!</p>
          <form onSubmit={handleProjectSubmit} className="project-form">
            <input
              type="text"
              placeholder="🎉 Give your project an awesome title..."
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <textarea
              placeholder="📝 Describe what makes your project unique..."
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <button type="submit">🚀 Share Project</button>
          </form>
          <div className="projects">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="learning-resources">
          <h2>📚 Learning Resources</h2>
          <ul>
            <li><a href="https://reactjs.org/" target="_blank" rel="noreferrer">🔥 Official React Docs</a></li>
            <li><a href="https://javascript.info/" target="_blank" rel="noreferrer">🚀 The Modern JavaScript Tutorial</a></li>
          </ul>
        </section>

        <section className="discussion">
          <h2>🗣️ Discussion & Collaboration</h2>
          <form onSubmit={handleDiscussionSubmit} className="discussion-form">
            <input
              type="text"
              placeholder="💬 Got a question or an idea? Start a discussion..."
              value={newDiscussion}
              onChange={(e) => setNewDiscussion(e.target.value)}
            />
            <button type="submit">📢 Post Discussion</button>
          </form>
          {discussions.map((discussion, index) => (
            <div key={index} className="forum-post">
              <h3>{discussion.question}</h3>
              {discussion.comments.map((comment, i) => (
                <p key={i} className="comment">💡 {comment}</p>
              ))}
              <input
                type="text"
                placeholder="✍️ Add a thoughtful comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addComment(index, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          ))}
        </section>

        <section className="challenge">
          <h2>⚡ Challenge of the Week</h2>
          <div className="challenge-card">
            <h3>🌐 Build a Weather App</h3>
            <p>Fetch real-time weather data using an API and display it beautifully. Can you make it shine?</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityPage;
