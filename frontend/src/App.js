
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "./pages/HomePage.js"
import FormPage from "./pages/FormPage.js"
import ResultsPage from "./pages/ResultsPage.js"


// API ENDPOINTS
// ======================================================
// /user - get all users (GET).
// /schedule/upload - upload form data here (POST).
// /user/mydata - get personal data (GET).

const router = createBrowserRouter([
    {
	path: "/",
	element: <HomePage />
    },
    {
	path: "form",
	element: <FormPage />
    },
    {
	path: "profile",
	element: <ResultsPage />
    }
])

function App() {
    return <RouterProvider router={router} />
}


export default App;
