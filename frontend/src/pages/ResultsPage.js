

import React, { useEffect, useState } from "react"
import axios from "axios"
import CompatibilityList from "../components/CompatibilityList.js"
import Profile from "../components/Profile.js"
import "./ResultsPage.css"


function ResultsPage(props) {
    const [compatResults, setResults] = useState([])
    
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

    function editProfile() {
	console.log("WIP")
    }

    let resultsListElements = props.user ?
	<CompatibilityList results={compatResults} /> :
	(<p>Please Sign-In</p>)
    // TODO display error message when zero courses are found
    let coursesElements = props.user.courses.map(course => (
	<li>
	    <p className="course_name--p">{course.name}</p>
	    <p className="course_section--p">{course.section}</p>
	    <p className="course_type--p">{course.type}</p>
	</li>
    ))

    return (
	<main className="results--main">
	    <div className="profile_section--div">
		<h1>My Profile</h1>
		<Profile user={props.user} />
		<div className="courses--div">
		    <h2>Courses</h2>
		    <ul>
			{coursesElements}
		    </ul>
		</div>
		<div className="profile_buttons--div">
		    <button onClick={() => editProfile()}>Edit Profile</button>
		    <button onClick={props.signOut}>Sign Out</button>
		</div>
	    </div>
	    <div className="matches--div">
		<h1>Matches</h1>
		{resultsListElements}
	    </div>
	</main>
    )
}

export default ResultsPage
