function Header({ setInfoNumber }) {
  return (
    <>
      {/* ======= Header ======= */}
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="" />
            <span className="d-none d-lg-block">Gold Lounge</span>
          </a>
        </div>
        {/* End Logo */}
        <nav className="d-flex header-nav ms-auto">
          <ul className="nav justify-content-center">
            <li
              className="nav-item nav-link"
              onClick={() => {
                setTimeout(() => {
                  setInfoNumber(1);
                }, 0);
              }}
            >
              VIP
            </li>
            <li
              className="nav-item nav-link"
              onClick={() => {
                setTimeout(() => {
                  setInfoNumber(2);
                }, 0);
              }}
            >
              PB
            </li>
            <li
              className="nav-item nav-link"
              onClick={() => {
                setTimeout(() => {
                  setInfoNumber(3);
                }, 0);
              }}
            >
              Portfolio
            </li>
          </ul>
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <div className="nav-link nav-profile d-flex align-items-center pe-0">
                <span
                  className="d-none d-md-block ps-2 badge bg-danger"
                  onClick={() => {
                    setTimeout(() => {
                      setInfoNumber(0);
                    }, 0);
                  }}
                >
                  System Admin
                </span>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
