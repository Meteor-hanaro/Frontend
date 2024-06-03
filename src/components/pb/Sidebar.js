function Sidebar() {
  return (
    <>
      <>
        {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <a className="nav-link alignVertical" href="/pb/main">
                <i className="bi bi-person" />
                <span>Users</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link alignVertical" href="/pb/fund">
                <i className="bi bi-basket" />
                <span>Products</span>
              </a>
            </li>
            {/* End Dashboard Nav */}
          </ul>
        </aside>
      </>
    </>
  );
}

export default Sidebar;
