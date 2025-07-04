import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(currentUser.avatar); // local avatar
  const [uploading, setUploading] = useState(false);
const [uploadSuccess, setUploadSuccess] = useState(false);


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
setUploadSuccess(true);

    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  } catch (error) {
    console.error('Upload failed', error);
  } finally {
    setUploading(false);
  }
};






  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-blue-800'>Profile</h1>
      <form className='flex flex-col gap-4'>
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
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className='bg-blue-800 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-70'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
