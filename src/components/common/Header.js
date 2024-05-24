function Header() {
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
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <div className="nav-link nav-profile d-flex align-items-center pe-0">
                <span className="d-none d-md-block ps-2">K. Anderson</span>
              </div>
              {/* End Profile Iamge Icon */}
            </li>
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </header>
      {/* End Header */}
    </>
  );
}

export default Header;
