import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors}=useContext(AppContext);
    const [relatedDocs,setRelatedDocs]=useState([])
    const navigate=useNavigate()

    // console.log(docId,speciality)


    useEffect(()=>{
      if(doctors.length>0&&speciality){
        const relatedDoctors=doctors.filter((doc)=>doc.speciality===speciality && doc._id!==docId)
        setRelatedDocs(relatedDoctors)
        
      }

    },[doctors,speciality,docId])

  return (
    <div className="flex flex-col gap-4 items-center my-16 text-sm text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relatedDocs&&relatedDocs?.slice(0, 10).map((item, index) => (
          <div
          onClick={()=>{navigate(`/appointment/${item?._id}`);scrollTo(0,0)}}
            key={index}
            className="border border-blue-200  rounded-xl  overflow-hidden  cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img className="bg-blue-50" src={item?.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="bg-green-500 h-2 w-2 rounded-full "></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item?.name}</p>
              <p className="text-gray-600 text-sm">{item?.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <button onClick={()=>{useNavigate('/doctors');scrollTo(0,0)}} className="bg-blue-50 text-gray-500 px-12  py-3 rounded-full mt-1">More</button> */}
    </div>
  )
}

export default RelatedDoctors