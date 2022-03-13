import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useUserAuth } from "../context/UserAuthContextProvider";

const PhoneSignUp = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [OTP, setOTP] = useState("");
  const [showSection, setShowSection] = useState(true);
  const [confirmObj, setConfirmObj] = useState("");

  const history = useHistory();

  const { setUpRecaptcha } = useUserAuth();

  const getOTPHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (number === "" || number === undefined) {
      return setError("Please enter a valid Phone Number !");
    }

    try {
      const num = "+" + number;

      const response = await setUpRecaptcha(num);
      setConfirmObj(response);

      console.log(response);
      setShowSection(false);
    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (OTP === "" || OTP === null) return;

    try {
      await confirmObj.confirm(OTP);
      history.push("/home");
    } catch (err) {
      setError(err.message);

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="h-screen align-middle box-border flex flex-col space-y-3 justify-center items-center ">
      {showSection && (
        <section className="rounded-lg shadow-xl max-w-[80%] p-4 border flex flex-col">
          <h1 className="py-2 text-4xl font-extrabold text-center ">
            Phone SignUp
          </h1>
          <h1 className="py-2 text-2xl font-bold text-center ">
            React Firebase Authentication
          </h1>
          {error && (
            <h2 className="text-red-600 text-center  bg-red-200 p-3 mt-2 rounded-lg">
              {error}
            </h2>
          )}
          <form onSubmit={getOTPHandler} className=" pt-8 space-y-5">
            <div className="border"></div>
            <div className="px-4 py-2">
              <PhoneInput
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                className="w-[100%]"
                country={"in"}
                value={number}
                onChange={setNumber}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="border"></div>
            <div className="flex justify-center" id="recaptcha-container" />
            <div className="flex justify-end space-x-2">
              <Link to="/">
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500  text-white rounded-full">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full"
              >
                Send OTP
              </button>
            </div>
          </form>
        </section>
      )}

      {!showSection && (
        <section className="rounded-lg shadow-xl w-[80%] md:w-[40%] p-4 border flex flex-col">
          <h1 className="py-2 text-2xl font-bold">Enter OTP</h1>
          {error && (
            <h2 className="text-red-600 text-center  bg-red-200 p-3 mt-2 rounded-lg">
              {error}
            </h2>
          )}
          <form onSubmit={verifyOTP} className=" pt-8 space-y-5">
            <div className="px-4 py-2 border border-gray-400 rounded-lg">
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP here"
                className="outline-none"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="flex justify-between space-x-2">
              <Link to="/">
                <button className="px-4 py-2 bg-gray-600 hover:bg-gray-500  text-white rounded-full">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full"
              >
                Verify OTP
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default PhoneSignUp;
