import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { FaMapMarkerAlt, FaShare, FaBath, FaBed, FaParking, FaChair } from 'react-icons/fa';
import { useSelector } from "react-redux";

import "swiper/css/bundle";
import { current } from "@reduxjs/toolkit";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ contact ,setContact] = useState(false);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
 


  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/listing/get/${params.listingId}`,{credentials: 'include',});

        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  //console.log("listing.userRef:", listing?.userRef);
//console.log("currentUser._id:", currentUser?._id);
//console.log("Check:", String(listing?.userRef) !== String(currentUser?._id));


  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="w-full h-[400px] flex justify-center items-start overflow-hidden">
                  <img
                    src={url}
                    alt="listing"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-purple-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-blue-800 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-blue-800 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="text-lg"/>
                    {
                        listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`
                    }
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className="text-lg"/>
                    {
                        listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`
                    }
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaParking className="text-lg"/>
                    {
                       listing.parking ? 'Parking Spot' : 'No Parking'
                    }
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaChair className="text-lg"/>
                    {
                       listing.furnished ? 'Furnished' : 'Unfurnished'
                    }
                </li>
            </ul>
           {currentUser && String(listing.userRef) !== String(currentUser._id) && !contact && (
  <button onClick={() => setContact(true)} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-85 p-3">
    Contact Landlord
  </button>
)}

           {contact && <Contact listing={listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}
