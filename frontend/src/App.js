import logo from "./logo.svg";
import "./App.css";

function App() {
  fetch("/api")
    .then((res) => res.json())
    .then((data) => console.log(data));

  return <div className="App">This is react!</div>;
}

export default App;
