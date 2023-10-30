import PropTypes from "prop-types";

function Button({ btnName }) {
  return (
    <div>
      <button
        className="bg-hopgreenbtn hover:bg-woodcolor text-almostwhite flex justify-center items-center font-text font-bold p-6 drop-shadow-lg rounded-3xl m-5 h-14 transform active:scale-75 active:bg-woodcolor transition-transform"
        type="button"
        onClick=""
      >
        {btnName}
      </button>
    </div>
  );
}
Button.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default Button;
