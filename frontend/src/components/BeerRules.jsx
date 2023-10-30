import React, { useState } from "react";
import PropTypes from "prop-types";
import Beerblond2 from "../assets/images/Beerblond2.png";

function BeerRules({ rules }) {
  const [showText, setShowText] = useState(false);

  function toggleText() {
    setShowText(!showText);
  }

  return (
    <div>
      <button type="button" onClick={toggleText}>
        <img
          className="hover:animate-waving-beer absolute mt-1 lg:h-48 object-contain right-0 top-40 lg:top-12 w-20 lg:w-52 overflow-hidden"
          src={Beerblond2}
          alt="draw of beer and food"
        />
      </button>
      {showText && (
        <div className="lg:flex justify-center items-center overflow-hidden">
          <p className="m-5 lg:w-2/3 p-5 text-almostblack font-text font-medium bg-almostwhite rounded-3xl lg:text-ms max-lg:max-h-52 overflow-scroll">
            {rules}
          </p>
        </div>
      )}
    </div>
  );
}

BeerRules.propTypes = {
  rules: PropTypes.string.isRequired,
};

export default BeerRules;
