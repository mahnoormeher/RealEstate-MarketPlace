import React, { useState } from "react";

export default function CreateListing() {
    const [files,setFiles] =useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [uploading, setUploading] = useState(false);
const [error, setError] = useState("");


   // console.log(files)
 const handleImageSubmit = async (e) => {
  e.preventDefault();
  if (files.length < 1 || files.length > 6) {
    setError("Please upload between 1 and 6 images.");
    return;
  }

  setError(""); // clear error if valid

  const promises = [];
  for (let i = 0; i < files.length; i++) {
    promises.push(storeImage(files[i]));
  }

  setUploading(true);
  try {
    const imageUrls = await Promise.all(promises);
    setImageUrls(imageUrls);
  } catch (err) {
    console.error("Image upload failed:", err);
    setError("Failed to upload images. Try again.");
  }
  setUploading(false);
};



  const storeImage = async (file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "real_estate_unsigned");

    fetch("https://api.cloudinary.com/v1_1/dhgis4vd0/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => resolve(data.secure_url))
      .catch((err) => reject(err));
  });
};

const handleRemoveImage = (index) => {
  setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
};


  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-blue-800 my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="regulaarPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
<p>Regular Price</p>
<span className="text-xs">($ / month)</span>
              </div>
              
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border-gray-300 rounded-lg"
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
               <div className="flex flex-col items-center">
<p>Regular Price</p>
<span className="text-xs">($ / month)</span>
              </div>
              
            </div>
          </div>
        </div>
       <div className="flex flex-col gap-4">
  {/* Top row: Choose Files + Upload Button */}
  <div className="flex gap-4">
    <input
      onChange={(e) => setFiles(Array.from(e.target.files))}
      className="p-3 border border-gray-300 rounded w-full"
      type="file"
      id="images"
      accept="image/*"
      multiple
    />
    <button
      type="button"
      onClick={handleImageSubmit}
      disabled={uploading}
      className="p-3 text-blue-800 border border-blue-800 rounded uppercase hover:shadow-lg disabled:opacity-80"
    >
      {uploading ? "Uploading..." : "Upload"}
    </button>
  </div>
  {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

  {/* Below row: Vertical list of uploaded images */}
  {imageUrls.length > 0 && (
    <div className="flex flex-col gap-4">
      {imageUrls.map((url, index) => (
        <div key={index} className="flex justify-between p-3 border rounded overflow-hidden items-center">
          <img
            src={url}
            alt={`uploaded-${index}`}
            className="w-20 h-20 object-contain rounded-lg"
          />
         <button
  type="button"
  onClick={() => handleRemoveImage(index)}
  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-70"
>
  Delete
</button>

        </div>
      ))}
    </div>
  )}
   <button className="p-3 bg-purple-800 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-70">Create Listing</button>
</div> 

        
      </form>
    </main>
  );
}
