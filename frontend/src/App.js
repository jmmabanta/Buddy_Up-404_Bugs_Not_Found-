import logo from "./logo.svg"
import "./App.css"
import React from "react"
import axios from "axios"
import ical from "ical"

function App() {
    return (
	<div className="App">
	    <HomePage />
	</div>
    )
}


const showStates = {
    landing: 1,
    form: 2,
    results: 3,
}


class HomePage extends React.Component {
    constructor(props) {
	super(props)
	this.state = {
	    show: showStates.form
	}
    }

    signIn(response) {
	// axios.get("http://localhost:3000/login").then(response => {
	//     console.log(response)
	// })
	console.log("WIP")
    }

    render() {
	let display = []

	switch (this.state.show) {
	case showStates.landing:
	    display.push(<Landing signIn={this.signIn} />)
	    break
	case showStates.form:
	    display.push(<ScheduleForm />)
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
}


class Landing extends React.Component {
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


class Profile extends React.Component {
    render() {
	return (
	    <p>Profile WIP</p>
	)
    }
}


class CompatiabilityList extends React.Component {
    render() {
	return (
	    <p>CompatiabilityList WIP</p>
	)
    }
}


class ScheduleForm extends React.Component {
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
	if (this.fileInput.current.files.length > 0) {
	    const inputFilename = this.fileInput.current.files[0].name
	    parseFile(inputFilename)
	}
    }

    parseFile(filename) {
	const reader = new FileReader()
	reader.onload = (e) => {
	    const content = ical.parseICS(reader.result)
	    // TODO parse ical data into format for backend.
	}

	reader.readAsText(filename)
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
		<fieldset className="name--fieldset">
		    <span><label>First Name</label><input name="firstName" onChange={this.inputChange} /></span>
		    <span><label>Last Name</label><input name="lastName" onChange={this.inputChange} /></span>
		</fieldset>
		<span className="spacer--span"></span>
		<span>
		    <label>Faculty</label>
		    <select name="faculty" id="faculty--select" onChange={this.inputChange}>
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


export default App

