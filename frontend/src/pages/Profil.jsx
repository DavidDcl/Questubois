import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

import badWeather from "../assets/images/badWeather.png";
import sunnyWeather from "../assets/images/sunnyWeatherpng.png";
import happymood from "../assets/images/happymood.png";
import sadmood from "../assets/images/sadmood.png";
import middleWeather from "../assets/images/middleWeather.png";
import dataBeer from "../services/dataBeer";
import dataContextImg from "../services/dataContext";
import BeerRules from "../components/BeerRules";

function Profil({ setChoices }) {
  const [beerColorImages, setBeerColorImages] = useState(dataBeer);
  const [contextImages, setContextImages] = useState(dataContextImg);
  const [weatherSliderValue, setWeatherSliderValue] = useState(0);
  const [moodSliderValue, setMoodSliderValue] = useState(0);
  // const [showText, setShowText] = useState(false);

  function handleImageClick(id) {
    setBeerColorImages((prevImages) => {
      const updatedImages = prevImages.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            opacity: image.opacity === 0.5 ? 1 : 0.5,
          };
        }
        return image;
      });
      return updatedImages;
    });
  }

  function handleContextImageClick(id) {
    setContextImages((prevImages) => {
      const updatedImages = prevImages.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            opacity: image.opacity === 0.5 ? 1 : 0.5,
          };
        }
        return image;
      });
      return updatedImages;
    });
  }

  function handleWeatherSliderChange(event) {
    setWeatherSliderValue(event.target.value);
  }

  function handleMoodSliderChange(event) {
    setMoodSliderValue(event.target.value);
  }

  function handleMatchButtonClick() {
    const selectedBeerColors = beerColorImages
      .filter((image) => image.opacity === 1)
      .map((image) => image.label);

    const selectedContexts = contextImages
      .filter((image) => image.opacity === 1)
      .map((image) => image.label);

    const choices = {
      weather: parseInt(weatherSliderValue, 10),
      mood: parseInt(moodSliderValue, 10),
      beerColors: selectedBeerColors,
      contexts: selectedContexts,
    };

    setChoices(choices);
  }
  return (
    <section className=" w-screen h-full">
      <div className="flex justify-center max-w-8/12 mt-10 mb-10">
        <h1 className="font-title text-2xl text-center text-almostwhite bg-hopgreenbtn rounded-3xl p-5 w-64 lg:w-80">
          Your Profile
        </h1>
      </div>
      <BeerRules
        rules=" Welcome to the Tinderbeer game!
      
            Your goal is to find the perfect beer match.
          
            To achieve that, you need to complete your profile based on the
            weather, your mood, or the type of beer you're looking for, and then
            choose a context. You can also have multiple choices. When you're
            ready, click on the Let's Match button.
          "
      />
      <div className="flex flex-col justify-center items-center flex-wrap lg:flex-row">
        <div className="bg-almostblack rounded-3xl max-w-xl m-5">
          <h2 className="font-text font-bold text-xl text-center p-5 text-almostwhite lg:text-3xl">
            Choose your mood
          </h2>

          <div className="flex justify-around items-center">
            <div className="max-w-64 mx-auto flex justify-center items-center">
              <img
                src={badWeather}
                alt="draw of beer and food"
                className={`relative ml-5 mt-5 h-fit object-contain w-20 lg:w-24 z-10 transition-opacity duration-300 ${
                  weatherSliderValue >= 2 ? "opacity-50" : "opacity-100"
                }`}
              />
              <input
                type="range"
                id="0"
                min="0"
                max="10"
                value={weatherSliderValue}
                onChange={handleWeatherSliderChange}
                className="relative z-0 bg-almostwhite appearance-none h-5 rounded-3xl drop-shadow-lg w-full"
              />
              <img
                src={middleWeather}
                alt="draw of beer and food"
                className={`absolute top-17 pointer-events-none object-contain w-16 lg:w-20 h-fit z-10 transition-opacity duration-300 ${
                  weatherSliderValue >= 5 && weatherSliderValue <= 5
                    ? "opacity-100"
                    : "opacity-50"
                }`}
              />
              <img
                src={sunnyWeather}
                alt="draw of beer and food"
                className={`relative mr-5 mt-5 object-contain w-20 lg:w-24 h-fit z-10 transition-opacity duration-300 ${
                  weatherSliderValue > 7 ? "opacity-100" : "opacity-50"
                }`}
              />
            </div>
          </div>
          <div className="flex justify-around items-center">
            <div className="max-w-64 mx-auto flex justify-center items-center">
              <img
                src={sadmood}
                alt="draw of beer and food"
                className={`relative ml-5 mt-5 pb-5 h-fit object-contain w-20 lg:w-24 z-10 transition-opacity duration-300 ${
                  moodSliderValue > 5 ? "opacity-70" : "opacity-100"
                }`}
              />
              <input
                type="range"
                id="1"
                min="0"
                max="10"
                value={moodSliderValue}
                onChange={handleMoodSliderChange}
                className="relative z-0 bg-almostwhite appearance-none h-5 rounded-3xl drop-shadow-lg w-full"
              />
              <img
                src={happymood}
                alt="draw of beer and food"
                className={`relative mr-5 mt-5 pb-5 object-contain w-20 lg:w-24 h-fit z-10 transition-opacity duration-300 ${
                  moodSliderValue > 6 ? "opacity-100" : "opacity-70"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-around">
        <div className="bg-almostblack rounded-3xl max-w-xl m-5">
          <h2 className="font-text font-bold text-xl text-center p-5 text-almostwhite lg:text-3xl">
            Choose your context
          </h2>

          <div className="flex justify-center items-center flex-wrap">
            {contextImages.map((image) => (
              <p
                key={uuid()}
                className="flex justify-end items-center text-almostwhite font-text flex-col pb-7"
              >
                <button
                  onClick={() => handleContextImageClick(image.id)}
                  type="button"
                >
                  <img
                    key={image.id}
                    src={image.src}
                    alt={image.label}
                    className={`ml-5 mr-5 mt-5 object-contain h-20 w-28 cursor-pointer transition-opacity duration-300 ${
                      image.opacity === 1 ? "" : "opacity-50"
                    }`}
                  />
                </button>
                {image.label}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-around">
        <div className="bg-almostblack rounded-3xl min-w-sm m-5">
          <h2 className="font-text font-bold text-xl text-center p-5 text-almostwhite lg:text-3xl">
            Choose your beer's color
          </h2>

          <div className="flex justify-center items-center flex-wrap p-3">
            {beerColorImages.map((image) => (
              <p
                key={uuid()}
                className="flex justify-end items-center text-almostwhite font-text flex-col pb-7"
              >
                <button
                  onClick={() => handleImageClick(image.id)}
                  type="button"
                >
                  <img
                    key={image.id}
                    src={image.src}
                    alt={image.label}
                    className={`h-20 w-28 cursor-pointer transition-opacity object-contain duration-300 ${
                      image.opacity === 1 ? "" : "opacity-50"
                    }`}
                  />
                </button>
                {image.label}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="hover:animate-bounce m-10 font-text font-semibold text-2xl lg:text-4xl text-center text-almostwhite  bg-hopgreenbtn  rounded-3xl p-10 hover:bg-almostblack hover:text-hopgreenbtn drop-shadow-lg transform active:scale-75 active:bg-almostblack active:text-almostwhite transition-transform"
          onClick={handleMatchButtonClick}
          type="button"
        >
          <Link
            to="/TinderBeer"
            className="text-almostwhite hover:no-underline"
          >
            Let's Match!
          </Link>
        </button>
      </div>
    </section>
  );
}
Profil.propTypes = {
  setChoices: PropTypes.func,
};
Profil.defaultProps = {
  setChoices: () => {},
};
export default Profil;
