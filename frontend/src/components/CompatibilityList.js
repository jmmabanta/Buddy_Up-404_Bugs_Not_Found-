
import React, { useState, useEffect } from "react"
import axios from "axios"
import Profile from "./Profile.js"
import "./CompatibilityList.css"


function CompatiabilityList(props) {
    let personListElements = []
    personListElements = props.results.map(person => (
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
