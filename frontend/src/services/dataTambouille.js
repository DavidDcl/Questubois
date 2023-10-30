import red from "../assets/Images/redMeat.png";
import white from "../assets/Images/whiteMeat.png";
import vege from "../assets/Images/vegetable.png";
import fish from "../assets/Images/fish.png";
import cheese from "../assets/Images/cheese.png";
import sugar from "../assets/Images/desert.png";

const dataTambouille = [
  {
    id: "vianderouge",
    src: red,
    alt: "Steak !",
    label: "viande rouge",
    opacity: 0.5,
  },
  {
    id: "viandeblanche",
    src: white,
    alt: "Oh mon poulet !",
    label: "viande blanche",
    opacity: 0.5,
  },
  {
    id: "vege",
    src: vege,
    alt: " de l'herbe !",
    label: "vegetarien",
    opacity: 0.5,
  },
  {
    id: "poisson",
    src: fish,
    alt: "un poiscaille !",
    label: "poisson",
    opacity: 0.5,
  },
  {
    id: "fromage",
    src: cheese,
    alt: "Du frometon !",
    label: "fromage",
    opacity: 0.5,
  },
  {
    id: "dessert",
    src: sugar,
    alt: " Diabète!",
    label: "dessert",
    opacity: 0.5,
  },
];

export default dataTambouille;
