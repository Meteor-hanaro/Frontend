function NameContainer({ contents }) {
  return (
    <div className="container my-5">
      <div className="p-5 text-center bg-body-secondary rounded-3">
        <h3 className="text-body-emphasis">{contents}</h3>
      </div>
    </div>
  );
}

export default NameContainer;
