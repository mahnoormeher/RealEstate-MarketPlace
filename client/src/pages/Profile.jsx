import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signInSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice';
import { updateUserStart , updateUserSuccess, updateUserFailure} from '../redux/user/userSlice';
import {Link} from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//import { useLocation } from 'react-router-dom';


export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  //const location = useLocation();

  const { currentUser,loading,error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(currentUser.avatar); // local avatar
  const [uploading, setUploading] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);
const [updateSuccess , setUpdateSuccess] = useState(false);
const [formData, setFormData] = useState({});
const [showListingsError,setShowListingsError] = useState(false);
const [userListings , setUserListings]  = useState([]);

//console.log(formData)


const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    setUploading(true);
    setUploadSuccess(false);

  const res = await fetch(`${API_BASE_URL}/api/upload`, {


      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Upload failed');
    }

    console.log('Uploaded URL:', data.imageUrl);
   
    setAvatar(data.imageUrl);
dispatch(signInSuccess({ ...currentUser, avatar: data.imageUrl }));
localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, avatar: data.imageUrl }));

setUploadSuccess(true);

    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 4000);
  } catch (error) {
    console.error('Upload failed', error);
  } finally {
    setUploading(false);
  }
};


const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};


const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    dispatch(updateUserStart());
   const res = await fetch(`${API_BASE_URL}/api/user/update/${currentUser._id}`, {

      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...formData,avatar}),
    });

    const data = await res.json();
    if(data.success===false){
      dispatch(updateUserFailure(data.message));
      return;
    }

    dispatch(updateUserSuccess(data));
   setUpdateSuccess(true);
   setTimeout(() => {
  setUpdateSuccess(false);
}, 3000);
    localStorage.setItem('currentUser', JSON.stringify(data));

  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}

const handleDeleteUser = async()=>{
  try {
    dispatch(deleteUserStart());
     const res = await fetch(`${API_BASE_URL}/api/user/delete/${currentUser._id}`, {

      method: 'DELETE',
     credentials: 'include',
    });

    const data = await res.json();
    if(data.success===false){
      dispatch(deleteUserFailure(err.message));
      return;
    }

    dispatch(deleteUserSuccess(data));
   
    localStorage.removeItem('currentUser');
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
  }
}

const handleSignOut= async()=>{
try {
  dispatch(signoutUserStart());
 const res = await fetch(`${API_BASE_URL}/api/auth/signout`, {

    credentials: 'include',
  });
  const data = await res.json();
  if(data.success===false){
    dispatch(signoutUserFailure(data.message));
    return;
  }
  dispatch(signoutUserSuccess(data));
} catch (error) {
   dispatch(signoutUserFailure(data.message));
}
}

const handleShowListings = async()=>{
  try {
    setShowListingsError(false);
    const res = await fetch(`${API_BASE_URL}/api/user/listings/${currentUser._id}`, {

       credentials: 'include',
    }
      
    );
const data = await res.json();
if(data.success ===false){
  setShowListingsError(true);
  return;
}
//console.log("Listings:", data)
//console.log("User Listings: ", data);
    //console.log("Is Array: ", Array.isArray(data));
    setUserListings(data);


  } catch (error) {
    setShowListingsError(true);
  }
}

const handleListingDelete = async(listingId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/listing/delete/${listingId}`, {

      method : 'DELETE',
    })
    const data = await res.json();
    if(data.success === false){
      console.log(error.message);
      return;
    }

    setUserListings((prev)=> 
      prev.filter((listing)=> listing._id !== listingId)
  );
  } catch (error) { 
    console.log(error.message)
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-blue-800'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          onChange={handleImageUpload}
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        {uploading && (
  <p className="text-blue-500 text-center font-semibold">Image Uploading...</p>
)}
{uploadSuccess && (
  <p className="text-green-600 text-center font-semibold">Image Uploaded Successfully!</p>
)}

        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
        defaultValue={currentUser.email || ''}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading} type='submit' className='bg-blue-800 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-70'>
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='text-white p-3 rounded-lg text-center bg-purple-800 uppercase hover:opacity-85' to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span  onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-blue-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-600 font-bold mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    <button onClick={handleShowListings} className='text-purple-800 w-full text-xl font-semibold'>Show Listings</button>
    <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
   
   {userListings && userListings.length>0 &&
   <div className='flex flex-col gap-4'>
    <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
  {userListings.map((listing)=>(
    <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
       <Link to={`/listing/${listing._id}`}>
       <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain rounded-lg' />
       </Link>
       <Link className='text-blue-700 font-semibold flex-1 hover:underline truncate' to={`/listing/${listing._id}`}>
       <p>{listing.name}</p>
       </Link>
       <div className='flex flex-col items-center'>
          <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
        <Link to={`/update-listing/${listing._id}`}>
          <button className='text-green-600 uppercase'>Edit</button>
          </Link>
       </div>
    </div>
))
}
    </div>}
    </div>
  );
}
