import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Signin() {
  const [formData, setFormData] =useState({})
 const {loading , error} = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange=(e)=>{
setFormData(
  {
    ...formData,
    [e.target.id] : e.target.value,
  }
)
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart());
     const res = await fetch(`${API_BASE_URL}/api/auth/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(formData),
      }
    )
    const data = await res.json();
    // console.log(data);
    if(data.success===false){
      dispatch(signInFailure(data.message));
      return;
    }
   dispatch(signInSuccess(data));
    navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  //console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-blue-800 my-7">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email" onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password" onChange={handleChange}
          autoComplete="off"
        />
        <button disabled={loading} className="bg-blue-800 text-white p-3
        rounded-lg uppercase hover:opacity-85 disabled:opacity-70">{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont't have an account?</p>
        <Link to ={"/sign-up"}>
        <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>}
    </div>
  );
}
