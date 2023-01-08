import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

const LoginButton = () => {
  // From: https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
  // Exchange Google OAuth tokens with Express Backend
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const userData = await axios.post("/login", {
        code,
      });
      console.log(userData);
    },
    onError: (err) => console.err(err),
    flow: "auth-code",
  });
  return <button onClick={() => login()}>Sign In With Google</button>;
};

class HomePage extends React.Component {
  render() {
    return (
      <main id="homepage">
        <h1>BuddyUp</h1>
        <p id="siteDesc--p">
          A modern study buddy finder using cutting machine learning quantum
          computing algorithms to give you the most compatiable study buddies
          EVER.
        </p>
        <LoginButton />
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
