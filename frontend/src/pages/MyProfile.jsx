import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets?.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1  123 456 7890",
    address: {
      line1: "57th Cross, Richmond Circle,",
      line2: "Church Road, London",
    },
    gender: "male",
    dob: "20 July, 2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      console.log(addressField);
      setUserData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  console.log(userData);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm ">
      <img className="w-36 rounded" src={userData?.image} alt="" />
      {/* <img src={userData?.image} alt="" /> */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          name="name"
          value={userData?.name}
          onChange={handleChange}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData?.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px]  border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3 ">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
          <p className="font-medium">EmailId:</p>{" "}
          {isEdit ? (
            <input
              type="text"
              name="email"
              value={userData?.email}
              onChange={handleChange}
            />
          ) : (
            <p className="text-blue-500 ">{userData.email}</p>
          )}
          <p className="font-medium">Phone:</p>{" "}
          {isEdit ? (
            <input
            className="bg-gray-50 max-w-52"
              type="text"
              name="phone"
              value={userData?.phone}
              onChange={handleChange}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium"> address:</p>
          {isEdit ? (
            <p>
              <input
              className="bg-gray-50 "
                type="text"
                name="address.line1"
                value={userData?.address?.line1}
                onChange={handleChange}
              />
              <input
              className="bg-gray-50"
                type="text"
                name="address.line2"
                value={userData?.address?.line2}
                onChange={handleChange}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address?.line1}
              <br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-ne">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
            className="max-w-20 bg-gray-100 "
              name="gender"
              id=""
              value={userData?.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400 ">{userData?.gender} </p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
            className="bg-gray-100 max-w-28 "
              type="date"
              name="dob"
              id=""
              onChange={handleChange}
            />
          ) : (
            <p className="text-gray-400">{userData?.dob}</p>
          )}

        </div>
        <div className="mt-10 ">
          {isEdit ? (
            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-colors   " onClick={() => setIsEdit(false)}>Save information</button>
          ) : (
            <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all " onClick={() => setIsEdit(true)}>edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
