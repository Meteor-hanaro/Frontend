import { useEffect, useState } from 'react';
import auth from '../../auth';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [vip, setVip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth
      .get('http://127.0.0.1:8080/api/pb/main')
      .then((res) => {
        console.log(res.data.vip);
        setVip(res.data.vip);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkPortfolio = (vipId) => {
    navigate(`/pb/portfolio`, { state: { vipId } });
  };

  return (
    <>
      <main
        id='main'
        className='main'
        style={{
          padding: '45px',
          height: `calc(100vh - 60px)`,
        }}
      >
        <div className='pagetitle'>
          <h1>사용자 목록</h1>
        </div>
        {/* Search Bar */}
        <div className='search-bar' style={{ marginTop: '25px' }}>
          <form
            className='search-form d-flex align-items-center'
            method='POST'
            action='#'
          >
            <input
              type='text'
              name='query'
              placeholder='Search'
              title='Enter search keyword'
            />
            <button type='submit' title='Search'>
              <i className='bi bi-search' />
            </button>
          </form>
        </div>
        {/* End Search Bar */}
        {/* Recent Sales */}
        <div className='col-12' style={{ marginTop: '25px' }}>
          <div className='card recent-sales overflow-auto'>
            <div className='card-body' style={{ padding: '20px' }}>
              <table className='table table-borderless datatable'>
                <thead>
                  <tr>
                    <th className='col-1'>No</th>
                    <th className='col-1'>Status</th>
                    <th className='col-1'>Name</th>
                    <th className='col-2'>Risk Tolerance</th>
                    <th className='col-3'>Final Consultation Date</th>
                    <th className='col-5'>Portfolio</th>
                  </tr>
                </thead>
                <tbody>
                  {vip.map((item, index) => (
                    <tr key={index}>
                      <th scope='row'>
                        <a href={`#${item.vipId}`}>{`#${item.vipId}`}</a>
                      </th>
                      <td>
                        <span
                          className={`badge bg-${
                            item.status ? 'success' : 'warning'
                          }`}
                        >
                          {item.status ? 'Approved' : 'Pending'}
                        </span>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.riskType}</td>
                      <td>{item.consultDate}</td>
                      <td>
                        <button
                          type='button'
                          className='pbBtn'
                          onClick={() => checkPortfolio(item.vipId)}
                        >
                          <i class='bi bi-clipboard2-data'></i>
                          포트폴리오
                        </button>
                        <button
                          type='button'
                          className='pbBtn'
                          style={{ marginLeft: '20px' }}
                        >
                          <i class='bi bi-clipboard2-check'></i>
                          &nbsp; 제안서
                        </button>
                        <button
                          type='button'
                          class='pbBtn'
                          style={{ marginLeft: '20px' }}
                        >
                          <i class='bi bi-person-rolodex'></i>
                          &nbsp; 상담 신청
                        </button>
                      </td>
                    </tr>
                  ))}
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
