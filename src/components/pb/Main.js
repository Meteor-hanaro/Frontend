import { useEffect, useState } from 'react';
import auth from '../../auth';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const [vip, setVip] = useState([]);
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // vip 정보
    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/pb/main`)
      .then((res) => {
        setVip(res.data.vip);
        setState(res.data.state);
      })
      .catch((error) => {
        console.log(error);
      });

    // 일정 시간 간격으로 state 정보 갱신
    const intervalId = setInterval(getUserState, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const getUserState = () => {
    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/pb/main/state`)
      .then((res) => {
        setState(res.data.state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPortfolio = (vipId) => {
    navigate(`/pb/portfolio`, { state: { vipId } });
  };

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
                    <th className="col-1">No</th>
                    <th className="col-1">Status</th>
                    <th className="col-1">Name</th>
                    <th className="col-2">Risk Tolerance</th>
                    <th className="col-3">Final Consultation Date</th>
                    <th className="col-5">Portfolio</th>
                  </tr>
                </thead>
                <tbody>
                  {state.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <a
                          href={`#${vip[index].vipId}`}
                        >{`#${vip[index].vipId}`}</a>
                      </th>
                      <td>
                        <span
                          className={`badge bg-${
                            item.state ? 'success' : 'warning'
                          }`}
                        >
                          {item.state ? 'Active' : 'In-Active'}
                        </span>
                      </td>
                      <td>{vip[index].name}</td>
                      <td>{vip[index].riskType}</td>
                      <td>{vip[index].consultDate}</td>
                      <td>
                        <button
                          type="button"
                          className="pbBtn"
                          onClick={() => checkPortfolio(vip[index].vipId)}
                        >
                          <i class="bi bi-clipboard2-data"></i>
                          포트폴리오
                        </button>
                        <Link to={`/pb/suggestion/${item.vipId}`}>
                          <button
                            type="button"
                            className="pbBtn"
                            style={{ marginLeft: '20px' }}
                          >
                            <i className="bi bi-clipboard2-check"></i>
                            &nbsp; 제안서
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="pbBtn"
                          style={{ marginLeft: '20px' }}
                        >
                          <i className="bi bi-person-rolodex"></i>
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
