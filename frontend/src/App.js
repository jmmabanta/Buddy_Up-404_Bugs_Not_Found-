import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";


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


function HomePage() {
    const [show, setShow] = useState(showStates.landing)
    const [user, setUser] = useState(undefined)
    
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

    let display = []
    switch (show) {
    case showStates.landing:
	display.push(<Landing signIn={() => login()} />)
	break
    case showStates.form:
	display.push(<ScheduleForm onSuccess={(newShow) => setShow(newShow)} token={user.token} />)
	break
    case showStates.results:
	display.push(<Profile />)
	display.push(<CompatiabilityList />)
	break
    default:
	display.push(<p>404</p>)
    }

    return (
	<main className="homepage">
	    {display}
	</main>
    )
}


class Landing extends Component {
    render() {
	return (
	    <main className="landing">
		<h1 className="title--h1">BuddyUp</h1>
		<p className="site_description--p">A modern study buddy finder using cutting machine learning quantum computing algorithms to give you the most compatiable study buddies EVER.</p>
		<button className="sign_in--button" onClick={this.props.signIn}>Sign In</button>
	    </main> 
	)
    }
}


class Profile extends Component {
    constructor(props) {
	super(props)
    }

    render() {
	return (
	    <p>Profile WIP</p>
	)
    }
}


class CompatiabilityList extends Component {
    constructor(props) {
	super(props)
    }

    render() {
	return (
	    <p>CompatiabilityList WIP</p>
	)
    }
}

class ScheduleForm extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    faculties: [ // Faculty options that can be selected from.
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
	}

	this.inputChange = this.inputChange.bind(this)
	this.onSubmit = this.onSubmit.bind(this)
	this.fileInput = React.createRef();
    }

    inputChange(event) {
	const change = {}
	change[event.target.name] = event.target.value
	this.setState(change)
    }

    onSubmit(event) {
	event.preventDefault()
	// TODO display error when user enters more than one file.
	console.log("Submitting...")
	if (this.fileInput.current.files.length > 0 && this.state.faculty != undefined) {
	    const inputFile = this.fileInput.current.files[0]
	    const data = new FormData()
	    data.append("schedule", inputFile)
	    data.append("faculty", this.state.faculty)
	    console.log(this.props.token)
	    axios({
		method: "post",
		url: "/schedule/upload",
		data,
		headers: {
		    "Content-Type": "multipart/form-data",
		    "Authorization": this.props.token
		},
	    }).then(res => {
		this.props.onSuccess(showStates.results)
	    }).catch(err => {
		console.error(err)
	    })
	}
    }

    render() {
	const optionElements = this.state.faculties.map((faculty) => {
	    const optionName = `facultyOf${faculty}`
	    return (
		<option name={optionName} className="facultySelect--option" value={faculty}>
		    Faculty of {faculty}
		</option>
	    )
	})

	return (
	    <form className="user_info--form" onSubmit={this.onSubmit}>
		<span>
		    <label>Faculty</label>
		    <select name="faculty" id="faculty--select" onChange={this.inputChange}>
			<option disabled selected> -- select an option -- </option>
			{optionElements}
		    </select>
		</span>
		<span className="spacer--span"></span>
		<span><label>Schedule </label><input type="file" name="schedule" ref={this.fileInput} /></span>
		<span className="spacer--span"></span>
		<button type="submit" className="submit--button">Submit</button>
	    </form>
	)
    }
}

export default App;
