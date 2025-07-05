import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signInSuccess, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice';
import { updateUserStart , updateUserSuccess, updateUserFailure} from '../redux/user/userSlice';
import {Link} from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser,loading,error } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(currentUser.avatar); // local avatar
  const [uploading, setUploading] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);
const [updateSuccess , setUpdateSuccess] = useState(false);
const [formData, setFormData] = useState({});
//console.log(formData)


const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    setUploading(true);
    setUploadSuccess(false);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || 'Upload failed');
    }

    console.log('Uploaded URL:', data.imageUrl);
    setAvatar(data.imageUrl); // ✅ update avatar immediately
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
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
     credentials: 'include',
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
     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
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
  const res = await fetch(`/api/auth/signout`);
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
        <Link className='text-white p-3 rounded-lg text-center bg-green-600 uppercase hover:opacity-85' to={'/create-listing'}>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span  onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-blue-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error? error:''}</p>
      <p className='text-green-600 font-bold mt-5'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
    </div>
  );
}
