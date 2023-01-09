
import React from "react"
import userNotFound from "./userNotFound"
import "./Profile.css"


function Profile(props) {
    let imageSrc, name, email, faculty
    if (props.user) {
	imageSrc = props.user.picture
	name = <p>{props.user.name}</p>
	email = <p>{props.user.email}</p>
	faculty = <p>{props.user.faculty}</p>
    } else {
	imageSrc = userNotFound
	name = <p>404 Name not found</p>
    }

    return (
	<div className="profile--div">
	    <img src={imageSrc} />
	    <div className="profile_info--div">
		{name}
		{faculty}
		{email}
	    </div>
	</div>
    )
}

export default Profile
