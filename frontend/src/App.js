import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

class HomePage extends React.Component {
  signIn(response) {
    axios.get("/login").then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <main id="homepage">
        <h1>BuddyUp</h1>
        <p id="siteDesc--p">
          A modern study buddy finder using cutting machine learning quantum
          computing algorithms to give you the most compatiable study buddies
          EVER.
        </p>
        <button onClick={this.signIn}>Sign In</button>
      </main>
    );
  }
}

class ScheduleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faculties: [
        // Faculty options that can be selected from.
        "Business",
        "Arts",
        "Education",
        "Law",
        "Agriculture",
        "Environmental Sciences",
        "Engineering",
        "Science",
        "Kinesiology",
        "Recreation",
        "Medicine",
        "Nursing",
        "Pharmaceutical Sciences",
        "Rehabilitation Medicine",
      ],
    };
  }

  onSubmit(event) {
    console.log("WIP");
  }

  render() {
    const optionElements = this.state.faculties.map((faculty) => {
      const optionName = `facultyOf${faculty}`;
      return (
        <option name={optionName} className="facultySelect--option">
          Faculty of {faculty}
        </option>
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        <span>
          <label>First Name: </label>
          <input name="firstName" />
        </span>
        <span>
          <label>Last Name: </label>
          <input name="lastName" />
        </span>
        <br />
        <label>Faculty: </label>
        <select name="faculty" id="faculty--select">
          {optionElements}
        </select>
        <span>
          <label>Schedule </label>
          <input type="file" name="schedule" />
        </span>
        <br />
        <button>Submit</button>
      </form>
    );
  }
}

export default App;
