import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function Signup() {
  const [formData, setFormData] =useState({})
  const [error , setError] = useState(null);
  const [loading,setLoading] = useState(null);
  const navigate = useNavigate();
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
      setLoading(true);
   const res = await fetch(`${API_BASE_URL}/api/auth/signup`,
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
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  //console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold text-blue-800 my-7">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"  onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password" onChange={handleChange}
        />
        <button disabled={loading} className="bg-blue-800 text-white p-3
        rounded-lg uppercase hover:opacity-85 disabled:opacity-70">{loading ? 'Loading...' : 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to ={"/sign-in"}>
        <span className="text-blue-600">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-400 mt-5">{error}</p>}
    </div>
  );
}
