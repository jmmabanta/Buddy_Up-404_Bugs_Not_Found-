
import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
	setUser: (state, action) => {
	    return {
		...state,
		...action.payload
	    }
	},
	setProfile: (state, action) => {
	    return {
		...state,
		faculty: action.payload.faculty,
		courses: action.payload.courses
	    }
	}
    }
})

export const { setUser, setProfile } = userSlice.actions

export default userSlice.reducer
