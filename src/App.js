import './App.css';
import React from 'react';
import About from './components/about';
import Connect from './components/connect';
import Project from './components/project';
import switchModeIcon from './assets/dark-mode.png';
import projects from './projects';
import clones from './clones.js';

function getRandomClone() {
  const randomIndex = Math.floor(Math.random() * clones.clonesList.length);
  return clones.clonesList[randomIndex];
}

function App() {
  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.contains('dark');
    if (isDarkMode) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  };

  return (
    <div className="layout">
      <header>
        <h1>Wylie Fisher</h1>
        <h3>
          Front-End Web Developer
          <button title="switch color mode" onClick={toggleDarkMode}>
            <img src={switchModeIcon} alt="switch mode" className="icon" />
          </button>
        </h3>
      </header>
      <main>
        <About />
        <section className="projects">
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </section>
        <section className="connect">
          <h2>Connect</h2>
          <Connect link="mailto:me@wyliefisher.com" title="Email me!" icon="email" />
          <Connect link="https://github.com/wylie" title="More work on GitHub!" icon="github" />
          <Connect link="https://www.linkedin.com/in/wyliefisher/" title="Let's connect on Linkedin!" icon="linkedin" />
          <Connect link="https://www.goodreads.com/wyliefisher" title="Read with me on Goodreads!" icon="goodreads" />
        </section>
      </main>
      <footer>
        <p>{getRandomClone()}</p>
      </footer>
    </div>
  );
}

export default App;
