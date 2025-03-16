import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    darkMode : false
}

const darkModeSlice = createSlice({
    name : "darkmode",
    initialState : initialState,
    reducers : {
        toggleDarkMode : (state) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const {toggleDarkMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;