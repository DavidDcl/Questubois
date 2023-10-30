import axios from "axios";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { v4 as uuid } from "uuid";

function ToutesLesBieres() {
  const [searchValue, setSearchValue] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [modalBeer, setModalBeer] = useState(null);

  const openModal = (beer) => {
    setModalBeer(beer);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalBeer(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => setAllResults(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const filteredResults = allResults.filter((result) =>
      result.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchValue, allResults]);

  return (
    <div className="min-h-screen my-5 mx-5 pl-10 text-almostwhite">
      <div>
        <div className="relative flex">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search..."
            className="px-9 py-2 rounded-3xl border-none drop-shadow-lg focus:outline-none focus:border-almostwhite bg-almostblack text-almostwhite"
          />
          <BsSearch className="self-center ml-1 text-almostblack absolute left-0 w-7 h-7 bg-blondbeercolor rounded-full p-1" />
        </div>
      </div>
      <div className="mt-8 min-h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 justify-items-center">
          {searchResults.map((result) => (
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
      {modalBeer && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-almostblack opacity-50" />
          <div className="bg-almostblack rounded-3xl shadow-md p-4 z-20 h-80 mx-5 xl:w-9/12 xl:h-2/4 overflow-y-auto">
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
              Fermentation : {modalBeer.details.fermentation.temp.value} degres
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
    </div>
  );
}

export default ToutesLesBieres;
