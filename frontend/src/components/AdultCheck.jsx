import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdultCheck({ onAgeVerified }) {
  const [birthdate, setBirthdate] = useState("");

  const calculateAge = (birthday) => {
    const birthdateArray = birthday.split("-");
    const birthYear = parseInt(birthdateArray[0], 10);
    const birthMonth = parseInt(birthdateArray[1], 10);
    const birthDay = parseInt(birthdateArray[2], 10);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    let age = currentYear - birthYear;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age -= 1;
    }

    const maximumAge = 123;

    if (age > maximumAge || age < 0) {
      return NaN;
    }

    return age;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const age = calculateAge(birthdate);

    if (age >= 18 && age !== -1) {
      localStorage.setItem("ageVerified", "true");
      onAgeVerified(true);
    } else if (age < 18) {
      toast.error("You must be over 18 to access this site.");
    } else if (Number.isNaN(age)) {
      toast.error(
        "The date of birth you have entered is an aberration. Jeanne Calment is the oldest person ever documented, having lived to the age of 122."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen m-5">
      <div className="border-2 border-almostblack flex flex-col items-center bg-blondbeercolor text-almostblack text-center max-h-[500px] max-w-[500px]">
        <h1 className="mb-5 bg-almostblack text-blondbeercolor p-4 w-full text-center text-3xl font-extrabold">
          Caution
        </h1>
        <p className="mb-5 ml-2 font-semibold">
          Alcohol is highly addictive. Alcoholic products are forbidden to
          minors and pregnant women.
        </p>
        <p className="mb-5 ml-5 font-semibold">
          By entering this site, I acknowledge that I am of legal age and that I
          am authorized by the laws of my country to purchase products
          containing alcohol:
        </p>
        <h2 className="mb-5 font-bold">Please enter your birth date :</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            className="border mb-5 ml-2 p-2 text-xl text-center font-bold bg-almostblack text-almostwhite"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
          <button
            className="bg-almostblack text-almostwhite font-text rounded-xl m-1 p-2 border-none hover:bg-hopgreenbtn hover:text-almostblack hover:font-semibold transform active:scale-75"
            type="submit"
          >
            Check
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdultCheck;

export const isAgeVerified = () => {
  return localStorage.getItem("ageVerified") === "true";
};

AdultCheck.propTypes = {
  onAgeVerified: PropTypes.func.isRequired,
};
