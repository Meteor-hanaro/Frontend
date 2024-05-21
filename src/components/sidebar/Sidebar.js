function Sidebar() {
  return (
    <>
      <>
        {/* ======= Sidebar ======= */}
        <aside id="sidebar" className="sidebar">
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
              <a className="nav-link " href="index.html">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
              </a>
            </li>
            {/* End Dashboard Nav */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                href="index.html"
              >
                <i className="bi bi-menu-button-wide" />
                <span>Components</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="components-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="components-alerts.html">
                    <i className="bi bi-circle" />
                    <span>Alerts</span>
                  </a>
                </li>
                <li>
                  <a href="components-accordion.html">
                    <i className="bi bi-circle" />
                    <span>Accordion</span>
                  </a>
                </li>
                <li>
                  <a href="components-badges.html">
                    <i className="bi bi-circle" />
                    <span>Badges</span>
                  </a>
                </li>
                <li>
                  <a href="components-breadcrumbs.html">
                    <i className="bi bi-circle" />
                    <span>Breadcrumbs</span>
                  </a>
                </li>
                <li>
                  <a href="components-buttons.html">
                    <i className="bi bi-circle" />
                    <span>Buttons</span>
                  </a>
                </li>
                <li>
                  <a href="components-cards.html">
                    <i className="bi bi-circle" />
                    <span>Cards</span>
                  </a>
                </li>
                <li>
                  <a href="components-carousel.html">
                    <i className="bi bi-circle" />
                    <span>Carousel</span>
                  </a>
                </li>
                <li>
                  <a href="components-list-group.html">
                    <i className="bi bi-circle" />
                    <span>List group</span>
                  </a>
                </li>
                <li>
                  <a href="components-modal.html">
                    <i className="bi bi-circle" />
                    <span>Modal</span>
                  </a>
                </li>
                <li>
                  <a href="components-tabs.html">
                    <i className="bi bi-circle" />
                    <span>Tabs</span>
                  </a>
                </li>
                <li>
                  <a href="components-pagination.html">
                    <i className="bi bi-circle" />
                    <span>Pagination</span>
                  </a>
                </li>
                <li>
                  <a href="components-progress.html">
                    <i className="bi bi-circle" />
                    <span>Progress</span>
                  </a>
                </li>
                <li>
                  <a href="components-spinners.html">
                    <i className="bi bi-circle" />
                    <span>Spinners</span>
                  </a>
                </li>
                <li>
                  <a href="components-tooltips.html">
                    <i className="bi bi-circle" />
                    <span>Tooltips</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* End Components Nav */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#forms-nav"
                data-bs-toggle="collapse"
                href="index.html"
              >
                <i className="bi bi-journal-text" />
                <span>Forms</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="forms-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="forms-elements.html">
                    <i className="bi bi-circle" />
                    <span>Form Elements</span>
                  </a>
                </li>
                <li>
                  <a href="forms-layouts.html">
                    <i className="bi bi-circle" />
                    <span>Form Layouts</span>
                  </a>
                </li>
                <li>
                  <a href="forms-editors.html">
                    <i className="bi bi-circle" />
                    <span>Form Editors</span>
                  </a>
                </li>
                <li>
                  <a href="forms-validation.html">
                    <i className="bi bi-circle" />
                    <span>Form Validation</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* End Forms Nav */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#tables-nav"
                data-bs-toggle="collapse"
                href="index.html"
              >
                <i className="bi bi-layout-text-window-reverse" />
                <span>Tables</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="tables-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="tables-general.html">
                    <i className="bi bi-circle" />
                    <span>General Tables</span>
                  </a>
                </li>
                <li>
                  <a href="tables-data.html">
                    <i className="bi bi-circle" />
                    <span>Data Tables</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* End Tables Nav */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#charts-nav"
                data-bs-toggle="collapse"
                href="index.html"
              >
                <i className="bi bi-bar-chart" />
                <span>Charts</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="charts-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="charts-chartjs.html">
                    <i className="bi bi-circle" />
                    <span>Chart.js</span>
                  </a>
                </li>
                <li>
                  <a href="charts-apexcharts.html">
                    <i className="bi bi-circle" />
                    <span>ApexCharts</span>
                  </a>
                </li>
                <li>
                  <a href="charts-echarts.html">
                    <i className="bi bi-circle" />
                    <span>ECharts</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* End Charts Nav */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                data-bs-target="#icons-nav"
                data-bs-toggle="collapse"
                href="index.html"
              >
                <i className="bi bi-gem" />
                <span>Icons</span>
                <i className="bi bi-chevron-down ms-auto" />
              </a>
              <ul
                id="icons-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <a href="icons-bootstrap.html">
                    <i className="bi bi-circle" />
                    <span>Bootstrap Icons</span>
                  </a>
                </li>
                <li>
                  <a href="icons-remix.html">
                    <i className="bi bi-circle" />
                    <span>Remix Icons</span>
                  </a>
                </li>
                <li>
                  <a href="icons-boxicons.html">
                    <i className="bi bi-circle" />
                    <span>Boxicons</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* End Icons Nav */}
            <li className="nav-heading">Pages</li>
            <li className="nav-item">
              <a className="nav-link collapsed" href="users-profile.html">
                <i className="bi bi-person" />
                <span>Profile</span>
              </a>
            </li>
            {/* End Profile Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-faq.html">
                <i className="bi bi-question-circle" />
                <span>F.A.Q</span>
              </a>
            </li>
            {/* End F.A.Q Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-contact.html">
                <i className="bi bi-envelope" />
                <span>Contact</span>
              </a>
            </li>
            {/* End Contact Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-register.html">
                <i className="bi bi-card-list" />
                <span>Register</span>
              </a>
            </li>
            {/* End Register Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-login.html">
                <i className="bi bi-box-arrow-in-right" />
                <span>Login</span>
              </a>
            </li>
            {/* End Login Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-error-404.html">
                <i className="bi bi-dash-circle" />
                <span>Error 404</span>
              </a>
            </li>
            {/* End Error 404 Page Nav */}
            <li className="nav-item">
              <a className="nav-link collapsed" href="pages-blank.html">
                <i className="bi bi-file-earmark" />
                <span>Blank</span>
              </a>
            </li>
            {/* End Blank Page Nav */}
          </ul>
        </aside>
      </>
    </>
  );
}

export default Sidebar;
