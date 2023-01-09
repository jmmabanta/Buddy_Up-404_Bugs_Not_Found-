
import React, { useState, useEffect } from "react"
import axios from "axios"
import Profile from "./Profile.js"
import "./CompatibilityList.css"


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
	    <ul>
		{personListElements}
	    </ul>
	</div>
    )
}

export default CompatiabilityList
