
import React from "react"
import axios from "axios"
import ScheduleForm from "../components/ScheduleForm.js"
import "./FormPage.css"


function FormPage(props) {
    function onSubmit(data) {
	axios({
	    method: "post",
	    url: "/schedule/upload",
	    data,
	    headers: {
		"Content-Type": "multipart/form-data",
		"Authorization": props.token
	    },
	}).then(res => {
	    console.log(res)
	    props.onSuccess(res.data)
	}).catch(err => {
	    console.error(err)
	})
    }

    return (
	<main className="form_page--main">
	    <h1>Please Fill out your Information</h1>
	    <ScheduleForm onSubmit={data => onSubmit(data)} />
	</main>
    )
}

export default FormPage
