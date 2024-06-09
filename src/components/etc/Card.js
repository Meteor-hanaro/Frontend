import { useState, useEffect } from 'react';
function Card({
  type,
  cardTitle,
  cardDrop,
  cardContent,
  cardPercentage,
  cardInDe,
  icon,
}) {
  const [perColor, setPerColor] = useState('text-success');
  useEffect(() => {
    if (cardInDe === 'decrease') setPerColor('text-danger');
  });

  return (
    <div className="col-xxl-4 col-md-6">
      <div className={`card info-card ${type}`}>
        {/* <div className="filter">
          <a className="icon" href="index.html" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li>
              <a className="dropdown-item" href="index.html">
                Today
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="index.html">
                This Month
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="index.html">
                This Year
              </a>
            </li>
          </ul>
        </div> */}
        <div className="card-body">
          <h5 className="card-title">
            {cardTitle} <span>| {cardDrop}</span>
          </h5>
          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={`bi ${icon}`} />
            </div>
            <div className="ps-3">
              <h6 className={`${perColor}`}>{cardContent}</h6>
              {/* <span className={`${perColor} small pt-1 fw-bold`}>
                {cardPercentage}
              </span> */}
              {/* <span className="text-muted small pt-2 ps-1">{cardInDe}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
