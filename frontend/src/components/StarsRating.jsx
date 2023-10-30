import React, { useState } from "react";

function StarRating() {
  const ratings = [
    { id: 1, name: "Lame" },
    { id: 2, name: "Bad" },
    { id: 3, name: "OK" },
    { id: 4, name: "Good" },
    { id: 5, name: "Excellent" },
  ];

  const [rating, setRating] = useState(null);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleMouseEnter = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {rating && (
        <div className="mt-1 text-almostwhite ">{ratings[rating - 1].name}</div>
      )}
      <div className="flex items-center justify-center">
        {ratings.map((item) => (
          <button
            key={item.id}
            className={`mx-1 p-1 ${
              rating >= item.id ? "text-blondbeercolor" : "text-neutralgrey"
            }`}
            onClick={() => handleRatingChange(item.id)}
            onMouseEnter={() => handleMouseEnter(item.id)}
            type="submit"
          >
            {Array(item).fill("★").join("")}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StarRating;
