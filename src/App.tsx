import Projects from "./Projects";
import Routine from "./Routine";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <h1 className="quote">
          &quot;Life before Death, Strength before Weakness, Journey before
          Destination.&quot;
        </h1>
      </div>
      <div>
        <h2 className="date-header">
          <span className="lighter-text">Today is</span> Monday, January 6th.
          What is your goal for today?
        </h2>
        <input type="text"></input>
      </div>
      <div>
        <Projects />
        <Routine />
      </div>
    </div>
  );
}

export default App;
