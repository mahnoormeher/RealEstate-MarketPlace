import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
error : null,
loading : false,

}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state)=>{
            state.loading=true;
        },
        signInSuccess : (state,action)=>{
            state.currentUser=action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        updateUserStart : (state) =>{
            state.loading = true;
        },
        updateUserSuccess : (state,action)=>{
state.currentUser = action.payload;
state.loading= false;
state.error = null;

        },
        updateUserFailure : (state , action)=>{
            state.error = action.payload;
            state.loading= false;
        },
         deleteUserStart : (state) =>{
            state.loading = true;
        },
        deleteUserSuccess : (state,action)=>{
state.currentUser = null;
state.loading= false;
state.error = null;

        },
        deleteUserFailure : (state , action)=>{
            state.error = action.payload;
            state.loading= false;
        },

    }
})

export const {deleteUserFailure,deleteUserStart,deleteUserSuccess, signInStart , signInSuccess , signInFailure , updateUserStart,updateUserSuccess,updateUserFailure} = userSlice.actions;

export default userSlice.reducer;