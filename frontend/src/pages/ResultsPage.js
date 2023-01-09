

import React from "react"
import CompatibilityList from "../components/CompatibilityList.js"
import Profile from "../components/Profile.js"
import "./ResultsPage.css"


function ResultsPage(props) {
    function editProfile() {
	console.log("WIP")
    }

    function signOut() {
	console.log("WIP")
    }

    let resultsList = props.user ?
	<CompatibilityList token={props.user.token} /> :
	(<p>Please Sign-In</p>)
    
    return (
	<main className="results--main">
	    <div className="profile_section--div">
		<h1>My Profile</h1>
		<Profile user={props.user} />
		<div className="courses--div">
		    <h2>Courses</h2>
		    <ul>
			<li>ECE 210</li>
			<li>ECE 210</li>
			<li>ECE 210</li>
			<li>ECE 210</li>
			<li>ECE 210</li>
		    </ul>
		</div>
		<div className="profile_buttons--div">
		    <button onClick={() => editProfile()}>Edit Profile</button>
		    <button onClick={() => signOut()}>Sign Out</button>
		</div>
	    </div>
	    <div className="matches--div">
		<h1>Matches</h1>
		{resultsList}
	    </div>
	</main>
    )
}

export default ResultsPage
