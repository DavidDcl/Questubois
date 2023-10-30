import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

import { useEffect, useState } from "react";
import StarRating from "../components/StarsRating";
import BeerRules from "../components/BeerRules";
import Beerblond2 from "../assets/images/Beerblond2.png";

function TinderBeer({ choices }) {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [fResults, setFResults] = useState([]);
  const [likedBeers, setLikedBeers] = useState([]);
  const [modalBeer, setModalBeer] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => setResults(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filteredMood = results.filter(
      (beer) => beer.details.mood === parseInt(choices.mood, 10)
    );
    const filteredWeather = results.filter(
      (beer) => beer.details.Temperature === parseInt(choices.weather, 10)
    );
    const filteredContexts = results.filter((beer) =>
      beer.details.humeur.some((humeur) => choices.contexts.includes(humeur))
    );
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].EBC >= 0 && results[i].EBC <= 10) {
        results[i].EBC = "White";
      }
      if (results[i].EBC >= 11 && results[i].EBC <= 25) {
        results[i].EBC = "Blond";
      }
      if (results[i].EBC >= 26 && results[i].EBC <= 35) {
        results[i].EBC = "Amber";
      }
      if (results[i].EBC >= 36 && results[i].EBC <= 80) {
        results[i].EBC = "Brown";
      }
      if (results[i].EBC >= 81 && results[i].EBC <= 100) {
        results[i].EBC = "Dark";
      }
    }
    const filteredColor = results.filter((beer) =>
      choices.beerColors.includes(beer.EBC)
    );
    const mergedResults = [
      ...new Set([
        ...filteredMood,
        ...filteredWeather,
        ...filteredContexts,
        ...filteredColor,
      ]),
    ];
    setFResults(mergedResults);
  }, [results.length]);

  const handleClick = () => {
    if (count <= results.length - 1) {
      setCount(count + 1);
    }
    if (count === results.length - 1) {
      toast.success("Finito pipo");
    }
  };
  function toggleText() {
    setShowText(!showText);
  }

  const handleClickSuccess = () => {
    if (count <= results.length - 1) {
      setCount(count + 1);
      setLikedBeers((prevLikedBeers) => [...prevLikedBeers, fResults[count]]);
      if (count === results.length - 1) {
        toast.success("Finito pipo");
      }
    }
  };
  const openModal = (beer) => {
    setModalBeer(beer);
  };

  const closeModal = () => {
    setModalBeer(null);
  };
  return (
    <div>
      {fResults && count >= 0 && count < fResults.length ? (
        <>
          <div>
            <button type="button" onClick={toggleText}>
              <img
                className="hover:animate-waving-beer absolute mt-7 lg:h-48 object-contain right-0 top-10 lg:top-12 w-20 lg:w-52 overflow-hidden"
                src={Beerblond2}
                alt="draw of beer and food"
              />
            </button>
            {showText && (
              <div className="lg:flex justify-center items-center overflow-hidden">
                <p className="m-5 lg:w-2/3 p-5 text-almostblack font-text font-medium bg-almostwhite rounded-3xl lg:text-ms max-lg:max-h-52 overflow-scroll">
                  Now that you have set up your profile, here are the beers that
                  match your preferences! Click on the buttons I like or I don't
                  depending on the ones you enjoy! And once you reach the end,
                  you will have a list of all the beers you have liked!
                </p>
              </div>
            )}
          </div>
          <div className="min-w-6/12 flex justify-center items-center ">
            <div className="m-8 p-10 border-almostblack border-8  bg-almostblack rounded-3xl md:w-25 drop-shadow-lg overflow-y-scroll  lg:w-1/3 lg:h-666 ">
              <div>
                <div>
                  <img
                    className="w-80 h-80 p-5 bg-almostwhite rounded-md object-contain mx-auto "
                    src={fResults[count].image_url}
                    alt="the beer to swipe"
                  />
                  <StarRating className="pressable" />
                </div>

                <div>
                  <ul className="text-almostwhite font-text text-left m-2">
                    <li className="m-2">name: {fResults[count].name}</li>
                    <li className="m-2">Degree: {fResults[count].abv}</li>
                    <li className="m-2 hidden lg:block text-sm">
                      Description: {fResults[count].description}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-row justify-center items-end m-5">
                <div className="flex justify-around m-2  h-14 ">
                  <img
                    className="object-contain mr-2 "
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      fResults[count].details.humeur?.[0]
                    }`}
                    alt="Humeur"
                  />
                  <img
                    className="object-contain ml-2"
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      fResults[count].Tips.food?.[0]
                    }`}
                    alt="Humeur"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center max-w-8/12 mt-10 mb-10">
            <h1 className="font-title text-2xl text-center text-almostwhite bg-hopgreenbtn rounded-3xl p-5 w-64 lg:w-80">
              Beers you liked
            </h1>
          </div>
          <div className="mt-8 min-h-full text-almostwhite">
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center">
              {likedBeers.map((result) => (
                <button
                  key={uuid()}
                  type="button"
                  onClick={() => openModal(result)}
                >
                  <div className="bg-almostblack rounded-3xl shadow-lg cursor-pointer flex flex-col hover:scale-110 items-center p-2 w-40 max-w-2xl h-64 drop-shadow-lg">
                    <img
                      src={result.image_url}
                      alt={result.name}
                      className="object-contain h-40 w-40 rounded-t-3xl bg-almostwhite p-1"
                    />
                    <h2 className="text-sm font-semibold text-center pt-2 text-ellipsis my-auto pb-2">
                      {result.name}
                    </h2>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {modalBeer && (
        <div className="fixed inset-0 flex items-center justify-center z-10 text-almostwhite">
          <div className="absolute inset-0 bg-almostblack opacity-50" />
          <div className="bg-almostblack rounded-3xl shadow-md p-4 z-20 max-h-80 mx-5 w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl overflow-y-auto">
            <h2 className="text-lg font-semibold">{modalBeer.name}</h2>
            <p>{modalBeer.tagline}</p>
            <p>{modalBeer.description}</p>
            <p>ABV: {modalBeer.abv}</p>
            <p>EBC: {modalBeer.EBC}</p>
            <p>IBU: {modalBeer.details.ibu}</p>
            <p>PH: {modalBeer.details.ph}</p>
            <p>First Brewed: {modalBeer.details.first_brewed}</p>
            {modalBeer.details.twist ? (
              <p>Twist : {modalBeer.details.twist}</p>
            ) : (
              <p>Twist : No twist </p>
            )}
            <p>
              Fermentation : {modalBeer.details.fermentation.temp.value} degrees
              Celsius
            </p>
            <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
            <div>
              <h4 className="text-md font-semibold">Malt</h4>
              <ul>
                {modalBeer.details.ingredients.malt.map((malt) => (
                  <li key={uuid()}>
                    {malt.name}: {malt.amount.value} {malt.amount.unit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold">Hops</h4>
              <ul>
                {modalBeer.details.ingredients.hops.map((hop) => (
                  <li key={uuid()}>
                    {hop.name}: {hop.amount.value} {hop.amount.unit} - {hop.add}{" "}
                    ({hop.attribute})
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-hopgreenbtn text-almostwhite mt-2 hover:bg-almostwhite hover:text-almostblack hover:font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {count < fResults.length && (
        <div className="flex justify-center   ">
          <button
            className="bg-red-500 mx-4 mb-10 w-1/2 flex items-center justify-center text-almostwhite font-text font-bold p-6 drop-shadow-lg rounded-3xl h-14 lg:text-2xl lg:w-1/6"
            type="button"
            onClick={handleClick}
          >
            I don't
          </button>
          <button
            className="bg-hopgreenbtn mx-4 mb-10 w-1/2 flex items-center justify-center text-almostwhite font-text font-bold p-6 drop-shadow-lg rounded-3xl h-14 lg:text-2xl lg:w-1/6"
            type="button"
            onClick={handleClickSuccess}
          >
            I like
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
TinderBeer.propTypes = {
  choices: PropTypes.shape({
    weather: PropTypes.number.isRequired,
    mood: PropTypes.number.isRequired,
    beerColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    contexts: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

TinderBeer.defaultProps = {
  choices: {
    weather: null,
    mood: null,
    beerColors: [],
    contexts: [],
  },
};
BeerRules.propTypes = {
  rules: PropTypes.string.isRequired,
};

export default TinderBeer;
