import { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api').then((res) => {
      setData(res.data);
      console.log(data);
    });
  });

  return (
    <>
      <main
        id="main"
        className="main"
        style={{
          padding: '45px',
          height: `calc(100vh - 60px)`,
        }}
      >
        <div className="pagetitle">
          <h1>사용자 목록</h1>
        </div>
        {/* Search Bar */}
        <div className="search-bar" style={{ marginTop: '25px' }}>
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form>
        </div>
        {/* End Search Bar */}
        {/* Recent Sales */}
        <div className="col-12" style={{ marginTop: '25px' }}>
          <div className="card recent-sales overflow-auto">
            <div className="card-body" style={{ padding: '20px' }}>
              <table className="table table-borderless datatable">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Name</th>
                    <th scope="col">Final Consultation Date</th>
                    <th scope="col">Portfolio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <a href="index.html">#2457</a>
                    </th>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>Brandon Jacob</td>
                    <td>0000-00-00</td>
                    <td>$64</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="index.html">#2147</a>
                    </th>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                    <td>Bridie Kessler</td>
                    <td>0000-00-00</td>
                    <td>$64</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="index.html">#2049</a>
                    </th>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>Ashleigh Langosh</td>
                    <td>0000-00-00</td>
                    <td>$64</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="index.html">#2644</a>
                    </th>
                    <td>
                      <span className="badge bg-danger">Rejected</span>
                    </td>
                    <td>Angus Grady</td>
                    <td>0000-00-00</td>
                    <td>$64</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <a href="index.html">#2644</a>
                    </th>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                    <td>Raheem Lehner</td>
                    <td>0000-00-00</td>
                    <td>$64</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End Recent Sales */}
      </main>
      {/* End #main */}
    </>
  );
}

export default Main;
