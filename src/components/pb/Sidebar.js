function Sidebar() {
  return (
    <>
      <>
        {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <a className="nav-link alignVertical" href="users-profile.html">
                <i className="bi bi-person" />
                <span>Users</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link alignVertical" href="index.html">
                <i className="bi bi-basket" />
                <span>Products</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link alignVertical" href="components-alerts.html">
                <i className="bi bi-bell" />
                <span>Notifications</span>
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
