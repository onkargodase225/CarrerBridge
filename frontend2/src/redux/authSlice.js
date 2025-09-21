
import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null // initally user null login karne ke bad true hoga
    },
    reducers:{
        // actions
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload; // jab user login kare to use uski profile vala icon diihna chahiye naki firese login and signup button
        }
    }
});

export const{setLoading, setUser}=authSlice.actions;
export default authSlice.reducer;