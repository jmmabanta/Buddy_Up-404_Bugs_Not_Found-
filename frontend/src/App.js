import logo from "./logo.svg"
import "./App.css"
import React from "react"
import axios from "axios"

function App() {
    return (
	<div className="App">
	    <HomePage />
	</div>
    )
}


class HomePage extends React.Component {
    constructor(props) {
	super(props)
	this.state = {
	    showLanding: true
	}
    }

    signIn(response) {
	axios.get("login/").then(response => {
	    console.log(response)
	})
    }

    render() {
	let display = []
	if (this.state.showLanding) {
	    display.push(<Landing />)
	} else {
	    display.push(<Profile />)
	    display.push(<CompatiabilityList />)
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
		<button className="sign_in--button" onClick={this.signIn}>Sign In</button>
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
    }

    onSubmit(event) {
	console.log("WIP")
    }

    render() {
	const optionElements = this.state.faculties.map((faculty) => {
	    const optionName = `facultyOf${faculty}`
	    return (
		<option name={optionName} className="facultySelect--option">
		    Faculty of {faculty}
		</option>
	    )
	})

	return (
	    <form onSubmit={this.onSubmit}>
		<span><label>First Name: </label><input name="firstName" /></span>
		<span><label>Last Name: </label><input name="lastName" /></span><br />
		<label>Faculty: </label>
		<select name="faculty" id="faculty--select">
		    {optionElements}
		</select>
		<span><label>Schedule </label><input type="file" name="schedule" /></span><br />
		<button>Submit</button>
	    </form>
	)
    }
}


export default App

