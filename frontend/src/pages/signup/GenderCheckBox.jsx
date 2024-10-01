const GenderCheckBox = () => {
  return (
    <div className="flex gap-7 justify-center items-center mt-2">
      <div className="form-control">
        <label className="label gap-2  cursor-pointer">
          <span className="label-text">Male</span>
          <input type="radio" name="radio-gender" className="radio" />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">FeMale</span>
          <input type="radio" name="radio-gender" className="radio" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
