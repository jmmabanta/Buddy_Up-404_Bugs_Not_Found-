import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import userNotFound from "./userNotFound"


// API ENDPOINTS
// ======================================================
// /user - get all users (GET).
// /schedule/upload - upload form data here (POST).
// /user/mydata - get personal data (GET).

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}


const showStates = {
    landing: 1,
    form: 2,
    results: 3,
}


function HomePage(props) {
    const [show, setShow] = useState(showStates.landing)
    const [user, setUser] = useState({})
    
    const login = useGoogleLogin({
	onSuccess: async ({ code }) => {
	    const userData = await axios.post("/login", {
		code,
	    })
	    console.log(userData)
	    setUser({
		token: userData.data.token,
		email: userData.data.email,
		name: userData.data.name,
		picture: userData.data.picture
	    })
	    setShow(showStates.form)
	},
	onError: (err) => console.err(err),
	flow: "auth-code",
    })

    let pages = {}
    pages[showStates.landing] = <Landing signIn={() => login()} />
    pages[showStates.form] = <ScheduleForm onSuccess={(newShow) => setShow(newShow)} token={user.token} />
    pages[showStates.results] = <Results user={user} />

    return (
	<main className="homepage">
	    {pages[show]}
	</main>
    )
}


function Landing(props) {
	return (
	    <main className="landing--main">
		<h1 className="title--h1">BuddyUp</h1>
		<p className="site_description--p">A modern study buddy finder using cutting machine learning quantum computing algorithms to give you the most compatiable study buddies EVER.</p>
		<button className="sign_in--button" onClick={props.signIn}>Sign In</button>
	    </main> 
	)
}


function Results(props) {
    let resultsList = props.user ? <CompatiabilityList token={props.user.token} /> : <p>Please Sign-In</p>

    return (
	<main className="results--main">
	    <Profile user={props.user} />
	    {resultsList}
	</main>
    )
}


function Profile(props) {
    let imageSrc, name, email
    if (props.user) {
	imageSrc = props.user.picture
	name = props.user.name
	email = props.user.email
    } else {
	imageSrc = userNotFound
	name = "User's fame not found"
	email = "User's email not found"
    }

    return (
	<div className="profile--div">
	    <img src={imageSrc} />
	    <p>{name}</p>
	    <p>{email}</p>
	</div>
    )
}


function CompatiabilityList(props) {
    const [compatiabilityResults, setResults] = useState([])
    
    useEffect(() => {
	axios({
	    method: "get",
	    url: "/user",
	    headers: {
		"Content-Type": "multipart/form-data",
		"Authorization": props.token
	    },
	}).then(response => {
	    console.log(response)
	    const keys = Object.keys(response.data)
	    const records = keys.map(key => response.data[key])
	    records.sort((r1, r2) => r1.count > r2.count)
	    setResults(records)
	}).catch(err => {
	    console.error(err)
	})
    }, [])

    let personListElements = []
    personListElements = compatiabilityResults.map(person => (
	<li><Profile user={person} /></li>
    ))

    return (
	<div className="compat_list--div">
	    <h1>Compatiability Results</h1>
	    <ul>
		{personListElements}
	    </ul>
	</div>
    )
}


function ScheduleForm(props) {
    // State variables 
    const [faculty, setFaculty] = useState(undefined)

    // Faculty options that can be selected from.
    const faculties = [ 
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
    ]
    const fileInput = React.createRef();

    function onSubmit(event) {
	event.preventDefault()
	// TODO display error when user enters more than one file.
	console.log("Submitting...")
	if (fileInput.current.files.length > 0 && faculty != undefined) {
	    const inputFile = fileInput.current.files[0]
	    const data = new FormData()
	    data.append("schedule", inputFile)
	    data.append("faculty", faculty)
	    console.log(props.token)
	    axios({
		method: "post",
		url: "/schedule/upload",
		data,
		headers: {
		    "Content-Type": "multipart/form-data",
		    "Authorization": props.token
		},
	    }).then(res => {
		props.onSuccess(showStates.results)
	    }).catch(err => {
		console.error(err)
	    })
	}
    }

    const facultyOptionElements = faculties.map((facultyName) => {
	const optionName = `facultyOf${facultyName}`
	return (
	    <option name={optionName} className="facultySelect--option" value={facultyName}>
		Faculty of {facultyName}
	    </option>
	)
    })

    return (
	<form className="user_info--form" onSubmit={onSubmit}>
	    <span>
		<label>Faculty</label>
		<select name="faculty" id="faculty--select" onChange={event => setFaculty(event.target.value)}>
		    <option disabled selected> -- select an option -- </option>
		    {facultyOptionElements}
		</select>
	    </span>
	    <span className="spacer--span"></span>
	    <span><label>Schedule </label><input type="file" name="schedule" ref={fileInput} /></span>
	    <span className="spacer--span"></span>
	    <button type="submit" className="submit--button">Submit</button>
	</form>
    )
}


export default App;
