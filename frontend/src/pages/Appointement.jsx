import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointement = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState();
  const [docSlot, setDocSlot] = useState();
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTIme] = useState("");
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlot = async () => {
    setDocSlot([]);

    //  logic for getting time slots

    // get current date
    let today = new Date();

    // logic for getting date for next 7 days
    for (let i = 0; i < 7; i++) {
      // getting current date
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // console.log(currentDate,`<<<<current date`)

      // getting endtime from the date by index
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        // set the interval between slots

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlot((pre) => [...pre, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlot();
  }, [docInfo]);

  return (
    <div>
      {/* doctor details */}
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div className="bg-primary w-full sm:max-w-72 rounded-lg">
          <img className="" src={docInfo?.image} alt="" />
        </div>
        {/* doc info */}
        <div className="flex-1 border border-gray-400 p-8 py-7 rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex gap-2 items-center text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img className="w-5" src={assets?.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree}-{docInfo?.speciality}
            </p>
            <button className="px-2 border border-gray-400 rounded-full py-0.5 text-xs ">
              {docInfo?.experience}
            </button>
          </div>
          {/* doctor about */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About
              <img className="w-3" src={assets?.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              Dr. Davis has a strong commitment to delivering comprehensive
              medical care, focusing on preventive medicine, early diagnosis,
              and effective treatment strategies. Dr. Davis has a strong
              commitment to delivering comprehensive medical care, focusing on
              preventive medicine, early diagnosis, and effective treatment
              strategies.
            </p>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-4">
            Appointment fee:
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo?.fees}
            </span>{" "}
          </p>
        </div>
      </div>
      {/* ---------------------- booking slots -------------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlot &&
            docSlot.length > 0 &&
            docSlot.map((item, index) => (
              <>
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white "
                      : "border border-gray-200"
                  }`}
                >
                  <p>
                    {item[0] &&
                      daysOfWeek[item[0] && item[0]?.dateTime?.getDay()]}
                  </p>
                  <p>{item[0] && item[0] && item[0]?.dateTime?.getDate()}</p>
                </div>
              </>
            ))}
        </div>
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4  ">
          {docSlot &&
            docSlot[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTIme(item?.time)}
                className={`text-sm font-light flex-shrink-0 border border-gray-200  py-2 px-5 rounded-full cursor-pointer ${
                  item?.time === slotTime
                    ? "bg-primary text-white "
                    : "border border-gray-200"
                }`}
              >
                {item?.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button className="py-3 px-14 font-light bg-primary rounded-full my-3 text-white text-sm">Book an appointement</button>
      </div>
       {/* Listing related doctors */}
      <RelatedDoctors  docId={docId} speciality={docInfo?.speciality}/>
    </div>
  );
};

export default Appointement;
