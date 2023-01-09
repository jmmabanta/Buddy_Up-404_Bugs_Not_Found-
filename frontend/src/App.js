
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import HomePage from "./pages/HomePage.js"
import FormPage from "./pages/FormPage.js"
import ResultsPage from "./pages/ResultsPage.js"


// API ENDPOINTS
// ======================================================
// /user - get all users (GET).
// /schedule/upload - upload form data here (POST).
// /user/mydata - get personal data (GET).

function App() {
    const [user, setUser] = useState({})
    
    let page
    if (user.token === undefined) {
	page = <HomePage onSignIn={(data) => setUser(data)} />
    } else if (user.token && user.faculty === "" && user.courses.length == 0) {
	page = <FormPage onSuccess={res => setUser({...user, ...res})}
			 token={user.token} />
    } else {
	page = <ResultsPage user={user}
			    signOut={() => setUser({})}
			    token={user.token} />
    }

    return (
	<div className="App">
	    {page}
	</div>
    )
}


export default App;
