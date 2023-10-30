import PropTypes from "prop-types";

function BigButton({ btnName }) {
  return (
    <div>
      <button
        className="bg-almostblack text-almostwhite hover:bg-hopgreenbtn hover:text-almostblack p-5 flex justify-center items-center font-text font-bold drop-shadow-lg  rounded-3xl m-5 lg:min-w-30 h-64 w-72 text-4xl transform active:scale-75 active:bg-hopgreenbtn active:text-almostwhite transition-transform"
        type="button"
      >
        {btnName}
      </button>
    </div>
  );
}
BigButton.propTypes = {
  btnName: PropTypes.string.isRequired,
};

export default BigButton;
