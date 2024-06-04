import React from 'react';

const FundCheckItem = ({ isCheck, title, onClick }) => {
  return (
    <div className="fund-check-item" onClick={onClick}>
      <label className="custom-checkbox">
        <input type="checkbox" checked={isCheck} onChange={() => {}} />
        <span className="checkmark"></span>
      </label>
      {title}
    </div>
  );
};

export default FundCheckItem;
