
import React from "react"
import axios from "axios"
import Landing from "../components/Landing.js"
import { useGoogleLogin } from "@react-oauth/google"


function HomePage(props) {
    const signIn = useGoogleLogin({
	onSuccess: async ({ code }) => {
	    const userData = await axios.post("/login", {
		code,
	    })
	    console.log(userData)
	    const existingRecord = await axios.get("/user/mydata", {
		method: "get",
		url: "/user",
		headers: {
		    "Content-Type": "multipart/form-data",
		    "Authorization": userData.data.token
		},
	    })

	    props.onSignIn({
		token: userData.data.token,
		email: userData.data.email,
		name: userData.data.name,
		picture: userData.data.picture,
		faculty: existingRecord.data ? existingRecord.data.faculty : "",
		courses: existingRecord.data ? existingRecord.data.courses : []
	    })

	    console.log(existingRecord)
	},
	onError: (err) => console.err(err),
	flow: "auth-code",
    })

    return (
	<main className="homepage">
	    <Landing signIn={() => signIn()} />
	</main>
    )
}

export default HomePage
