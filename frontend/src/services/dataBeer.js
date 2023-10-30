import whitebeer from "../assets/images/whitebeer.png";
import darkbeer from "../assets/images/darkBeer.png";
import blondBeerorigin from "../assets/images/blondBeerorigin.png";
import amberBeer from "../assets/images/amberBeer.png";
import brownBeer from "../assets/images/brownBeer.png";

const beers = [
  {
    id: "white-beer",
    src: whitebeer,
    alt: "draw of beer and food",
    label: "White",
    opacity: 0.5,
  },
  {
    id: "blond-beer",
    src: blondBeerorigin,
    alt: "draw of beer and food",
    label: "Blond",
    opacity: 0.5,
  },
  {
    id: "amber-beer",
    src: amberBeer,
    alt: "draw of beer and food",
    label: "Amber",
    opacity: 0.5,
  },
  {
    id: "brown-beer",
    src: brownBeer,
    alt: "draw of beer and food",
    label: "Brown",
    opacity: 0.5,
  },
  {
    id: "dark-beer",
    src: darkbeer,
    alt: "draw of beer and food",
    label: "Dark",
    opacity: 0.5,
  },
];
function dataBeer() {
  return beers;
}
export default dataBeer;
