const Input = ({ label, ...otherConfig }) => {
  return (
    <>
      <label for={label} className="form-label">
        {label}
      </label>
      <input {...otherConfig} className="form-control" />
    </>
  );
};

export default Input;
