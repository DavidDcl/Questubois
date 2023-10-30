import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import BeerRules from "../components/BeerRules";
import BigButton from "../components/BigButton";
import StarRating from "../components/StarsRating";

function Home() {
  const [allResults, setAllResults] = useState([]);
  const [beerOfTheMonth, setBeerOfTheMonth] = useState(null);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getBeerType(ebc) {
    if (ebc >= 0 && ebc <= 10) {
      return "White Beer";
    }
    if (ebc >= 11 && ebc <= 25) {
      return "Blond Beer";
    }
    if (ebc >= 26 && ebc <= 35) {
      return "Amber Beer";
    }
    if (ebc >= 36 && ebc <= 80) {
      return "Brown Beer";
    }
    if (ebc >= 81 && ebc <= 100) {
      return "Dark Beer";
    }
    return "Beer Not Found";
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => setAllResults(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (allResults.length > 0) {
      const randomIndex = getRandomInt(0, allResults.length - 1);
      setBeerOfTheMonth(allResults[randomIndex]);
    }
  }, [allResults]);

  return (
    <div className="flex flex-col justify-around align-middle">
      <div className="flex justify-center">
        <h1 className="text-center m-10 text-5xl text-almostblack items-center font-title font-bold">
          Choose a beer ...
        </h1>
      </div>
      <div>
        <BeerRules
          rules="  Questubois is a combination of two different games centered around
        beer. If you enjoy beer, you're sure to love it! And if you don't,
        who knows, maybe it'll change your mind!
        
        With your Mood, is designed specifically for those looking to find their perfect beer for
        the night or day. Complete your profile, and then it works just like
        Tinder! Swipe to the right if you like it but if you don't swipe to the left.
        However, beers can also choose, and some may refuse based on certain
        aspects of your profile that don't align with their preferences.
        Let's make a match!

        With your Food is a different kind of beer game that revolves
        around pairing beer with food. Beer offers a wide variety making it
        interesting to combine it with different dishes. In this game, you
        first choose whether you want to match your food with a beer or your
        beer with a food. Simply click on the picture that best resembles
        resembles your choice, and you'll be provided with a selection of
        beers or types of food, including recipes.

        And if you simply want to explore our precious beer collection, you
        can directly go to the menu and click on All Our Beer.
        "
        />
      </div>
      <div className="flex flex-wrap m-5 justify-center items-center ">
        <Link to="/Profil">
          <BigButton btnName="With your Mood" />
        </Link>
        <Link to="/QuestUChoose">
          <BigButton btnName="With your Food" />
        </Link>
      </div>
      {beerOfTheMonth && (
        <div className="min-w-6/12 flex justify-center items-center ">
          <div className="m-8 p-4 bg-almostblack rounded-3xl md:w-50 drop-shadow-lg overflow-hidden">
            <h2 className="text-center text-3xl m-5 text-almostwhite font-text">
              {" "}
              Beer of the month{" "}
            </h2>
            <div className="md:flex">
              <div className="flex flex-col justify-end items-center drop-shadow-lg ">
                <img
                  className="m-5 w-36 h-44 p-5 object-contain bg-almostwhite rounded-md text-center "
                  src={beerOfTheMonth.image_url}
                  alt=" the beer of the month"
                />
                <StarRating />
              </div>

              <div className="flex">
                <ul className="text-almostwhite rounded-3xl font-text text-left m-2">
                  <li className="m-2"> name : {beerOfTheMonth.name} </li>
                  <li className="m-2">
                    Type : {getBeerType(beerOfTheMonth.EBC)}{" "}
                  </li>
                  <li className="m-2">Degree : {beerOfTheMonth.abv}</li>
                  <li className="m-2">
                    Description : {beerOfTheMonth.description}
                  </li>
                  {beerOfTheMonth.details.twist && (
                    <li className="m-2">
                      Twist : {beerOfTheMonth.details.twist}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap justify-center items-center m-5">
              <img
                className="m-2 h-16 w-17"
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  beerOfTheMonth.Tips?.food?.[0]
                }`}
                alt="{Beer.typeOfFood}"
              />
              <img
                className="m-2 h-16 w-18 ml-4"
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  beerOfTheMonth.details.humeur?.[0]
                }`}
                alt="{Beer.typeOfContext}"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
