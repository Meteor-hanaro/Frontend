import React from 'react';
import FundCheckItem from './FundCheckItem';

const FundContract = ({ items, handleItemClick }) => {
  const { fundTitle, fundDescription, fundContracts } = items;
  return (
    <div className="fund-contract">
      <h1 className="card-title">{fundTitle}</h1>
      <h3 className="fund-card-body">{fundDescription}</h3>
      <h5 className="fund-header-left">{'필수 서류 확인'}</h5>
      <div className="fund-check-list">
        {fundContracts &&
          fundContracts.map((item, index) => {
            return (
              <FundCheckItem
                key={index}
                isCheck={item.isChecked}
                title={item.title}
                onClick={() => handleItemClick(item)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FundContract;
