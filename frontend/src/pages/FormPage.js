
import React from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { setProfile } from "../userSlice.js"
import { useNavigate } from "react-router-dom"
import ScheduleForm from "../components/ScheduleForm.js"
import "./FormPage.css"


function FormPage(props) {
    const token = useSelector((state) => state.user.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(data) {
	axios({
	    method: "post",
	    url: "/schedule/upload",
	    data,
	    headers: {
		"Content-Type": "multipart/form-data",
		"Authorization": token
	    },
	}).then(res => {
	    console.log(res)
	    dispatch({
		type: "user/setProfile",
		payload: {
		    faculty: res.data.faculty,
		    courses: res.data.courses
		}
	    })
	    navigate("/profile")
	}).catch(err => {
	    console.error(err)
	})
    }

    let form = !token ? <p>Please sign in</p> : <>
						    <h1>Please Fill out your Information</h1>
						    <ScheduleForm onSubmit={data => onSubmit(data)} />
						</>
    return (
	<main className="form_page--main">
	    {form}
	</main>
    )
}

export default FormPage
