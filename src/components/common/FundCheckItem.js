import React from 'react';

const FundCheckItem = ({ isCheck, title, onClick }) => {
  return (
    <div className="fund-check-item" onClick={onClick}>
      <input type="checkbox" checked={isCheck} onChange={() => {}}></input>
      {title}
    </div>
  );
};

export default FundCheckItem;
