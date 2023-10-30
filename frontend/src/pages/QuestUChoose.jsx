import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import dataTambouille from "../services/dataTambouille";
import plat from "../assets/images/trucdanschose.png";

// eslint-disable-next-line import/no-unresolved
import "swiper/css";

function SwiperSection() {
  const [tambouille, setTambouille] = useState(dataTambouille);
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api")
      .then((res) => {
        setBeers(res.data);
        setFilteredBeers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTambouille = (id) => {
    setTambouille((food) => {
      return food.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            opacity: image.opacity === 1 ? 0.5 : 1,
          };
        }
        return image;
      });
    });
  };

  useEffect(() => {
    const selectedImages = tambouille.filter((image) => image.opacity === 1);
    if (selectedImages.length > 0) {
      const selectedFood = selectedImages.map((image) =>
        image.label.toLowerCase()
      );
      const toto = beers.filter((beer) => {
        const foodTags = beer.Tips?.food || [];
        return foodTags.some((tag) => selectedFood.includes(tag.toLowerCase()));
      });
      setFilteredBeers(toto);
    } else {
      setFilteredBeers(beers);
    }
  }, [tambouille, beers]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen items-center justify-center m-5">
        <div className=" flex flex-col justify-center lg:m-5 bg-almostblack w-2/3 lg:w-1/5 lg:flex-wrap rounded-3xl">
          <h2 className="font-text font-bold text-xl text-center p-5 text-almostwhite lg:text-3xl">
            Choose your food
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            {tambouille.map((image) => (
              <div key={image.id}>
                <button
                  type="button"
                  onClick={() => handleTambouille(image.id)}
                >
                  <img
                    className={`object-contain h-20 w-20 ${
                      image.opacity === 1 ? "opacity-100" : "opacity-50"
                    }`}
                    src={image.src}
                    alt={image.alt}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center lg:m-5 mt-5 ">
          <img
            className="lg:visible max-lg:hidden lg:h-60 lg:w-60 "
            src={plat}
            alt="Bah t'es où ?"
          />
        </div>

        <div className="w-2/3 lg:w-1/2 bg-almostblack lg:m-5 flex justify-center items-center rounded-3xl">
          <div className="flex flex-wrap justify-center items-center h-80 w-3/4 overflow-hidden bg-almostblack m-10">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={window.innerWidth > 600 ? 3 : 2}
              loop
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
              }}
              className="h-full"
            >
              {filteredBeers.map((beer) => (
                <SwiperSlide
                  className="max-h-80 w-20 bg-almostwhite flex flex-col justify-center  items-center rounded-3xl"
                  key={beer.id}
                >
                  <p className="text-center pr-2 text-almostblack font-text font-semibold">
                    {beer.name}{" "}
                  </p>
                  <img
                    src={beer.image_url}
                    alt={beer.name}
                    className="h-48 w-16 pt-5 pb-5 hover:scale-125 object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwiperSection;
