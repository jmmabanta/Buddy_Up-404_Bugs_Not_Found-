
import React, { useState } from "react"
import axios from "axios"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import showStates from "../constants.js"
import "./ScheduleForm.css"


function ScheduleForm(props) {
    // State variables 
    const [faculty, setFaculty] = useState(undefined)

    function preSubmit(event) {
	event.preventDefault()

	// TODO display error when user enters more than one file.
	console.log("Submitting...")
	
	if (fileInput.current.files.length > 0 && faculty != undefined) {
	    const inputFile = fileInput.current.files[0]
	    const data = new FormData()
	    data.append("schedule", inputFile)
	    data.append("faculty", faculty)
	    console.log(props.token)

	    props.onSubmit(data)
	}
    }

    // Faculty options that can be selected from.
    const faculties = [ 
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
    ]
    const fileInput = React.createRef();


    const facultyOptionElements = faculties.map((facultyName) => {
	const optionName = `facultyOf${facultyName}`
	return (
	    <option name={optionName} className="facultySelect--option" value={facultyName}>
		Faculty of {facultyName}
	    </option>
	)
    })

    const formTextStyle = {
	fontSize: "20px",
	marginTop: "20px"
    }

    const buttonStyle = {
	marginTop: "50px"
    }

    // Bug: creating account but filling out form in separate session doesn't show results??
    return (
	<Form className="user_info--form" >
	    <fieldset>
		<Form.Group>
		    <Form.Label style={formTextStyle}>Faculty </Form.Label>
		    <Form.Select name="faculty" onChange={event => setFaculty(event.target.value)}>
			<option disabled selected> -- select an option -- </option>
			{facultyOptionElements}
		    </Form.Select>
		</Form.Group>
		<Form.Group>
		    <Form.Label style={formTextStyle}>Schedule </Form.Label>
		    <Form.Control type="file" ref={fileInput} />
		</Form.Group>
		<Button variant="primary" style={buttonStyle} onClick={preSubmit}>Submit</Button>
	    </fieldset>
	</Form>
    )
}

export default ScheduleForm
