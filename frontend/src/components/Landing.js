
import React from "react"

function Landing(props) {
    return (
	<main className="landing--main">
	    <h1 className="title--h1">BuddyUp</h1>
	    <p className="site_description--p">A modern study buddy finder using cutting machine learning quantum computing algorithms to give you the most compatiable study buddies EVER.</p>
	    <button className="sign_in--button" onClick={props.signIn}>Sign In</button>
	</main> 
    )
}

export default Landing
