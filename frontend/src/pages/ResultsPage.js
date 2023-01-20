
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CompatibilityList from "../components/CompatibilityList.js"
import Profile from "../components/Profile.js"
import "./ResultsPage.css"


function ResultsPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [compatResults, setResults] = useState([])
    
    useEffect(() => {
	axios({
	    method: "get",
	    url: "/user",
	    headers: {
		"Content-Type": "multipart/form-data",
		"Authorization": user.token
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

    function signOut() {
	dispatch({
	    type: "user/setUser",
	    payload: {}
	})
	navigate("/")
    }

    let resultsListElements = user.token ?
	<CompatibilityList results={compatResults} /> :
	(<p>Please Sign-In</p>)
    let coursesElements = user.courses ? user.courses.map(course => (
	<li>{course.name} {course.section}</li>
    )) : <p>Please edit your profile and enter your courses.</p>
    let profile = user.token ? <Profile user={user} /> : <p>Please Sign-in</p>

    return (
	<main className="results--main">
	    <div className="profile_section--div">
		<h1>My Profile</h1>
		{profile}
		<div className="courses--div">
		    <h2>Courses</h2>
		    <ul>
			{coursesElements}
		    </ul>
		</div>
		<div className="profile_buttons--div">
		    <button onClick={() => navigate("/form")}>Edit Profile</button>
		    <button onClick={signOut}>Sign Out</button>
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
