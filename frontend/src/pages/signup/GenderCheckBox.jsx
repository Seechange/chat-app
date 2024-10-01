const GenderCheckBox = ({ onRadioCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex gap-7 justify-center items-center mt-2">
      <div className="form-control">
        <label className="label gap-2  cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="radio"
            name="radio-gender"
            className="radio"
            checked={selectedGender === "male"}
            onChange={() => onRadioCheckBoxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">FeMale</span>
          <input
            type="radio"
            name="radio-gender"
            className="radio"
            checked={selectedGender === "female"}
            onChange={() => onRadioCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
