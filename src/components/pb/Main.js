import { useEffect, useRef, useState } from 'react';
import auth from '../../auth';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const ws = useRef(null);
  const navigate = useNavigate();
  const [isPause, setIsPause] = useState(true); // vip 접속 확인 허용 변수
  const [vip, setVip] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    // web socket
    ws.current = new WebSocket(`ws://${process.env.REACT_APP_CONSULTREQUEST}`);

    // 1. /pb/main 최초 진입 시, vip 목록 가져오기
    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}:8080/api/pb/main`)
      .then((res) => {
        setIsPause(false); // vip 접속 확인 허용
        setVip(res.data.vip);
        setState(res.data.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 2. /pb/main vip 검색
  const searchUser = () => {
    setIsPause(true); // vip 접속 확인 비허용

    const url = `http://${process.env.REACT_APP_BESERVERURI}:8080/api/pb/main/filter`;
    const data = {
      riskType: document.querySelector('.datatable-selector').value,
      name: document.querySelector('.search-form').value,
    };
    auth
      .post(url, null, {
        params: data,
      })
      .then((res) => {
        setVip(res.data.vip);
        setState(res.data.state);
        setIsPause(false); // vip 접속 확인 허용
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 3. isPause(vip 접속 확인 허용 변수)가 false면 vip 접속 확인을 반복적으로 수행
  useEffect(() => {
    if (!isPause) {
      const intervalId = setInterval(() => getUserState(vip), 4000);
      return () => clearInterval(intervalId);
    }
  }, [isPause]); // isPause이 변경될 때마다 useEffect 수행

  // 4.
  const getUserState = (vip) => {
    console.log('getUserState : ' + vip);
    const url = `http://${process.env.REACT_APP_BESERVERURI}:8080/api/pb/main/state`;
    const data = {
      vip: vip,
    };
    auth
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
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

  const sendConsultRequest = (vipId) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('send from pb to vip : ' + vipId);
      ws.current.send(vipId);
    }
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
        <div
          className='alignHorizontal search-bar'
          style={{ marginTop: '25px' }}
        >
          <select className='datatable-selector'>
            <option>전체</option>
            <option>STABLE</option>
            <option>CONSERVATIVE</option>
            <option>NEUTRAL</option>
            <option>GROWTH</option>
            <option>AGGRESSIVE</option>
          </select>
          <input
            className='search-form'
            type='text'
            name='query'
            placeholder='Search'
            title='Enter search keyword'
          />
          <button
            className='search-button'
            type='submit'
            title='Search'
            onClick={() => searchUser()}
          >
            <i className='bi bi-search' />
          </button>
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
                  {state.map((item, index) => (
                    <tr key={index}>
                      <th scope='row'>
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
                          type='button'
                          className='pbBtn'
                          onClick={() => checkPortfolio(vip[index].vipId)}
                        >
                          <i className='bi bi-clipboard2-data'></i>
                          포트폴리오
                        </button>
                        <Link to={`/pb/suggestion/${item.vipId}`}>
                          <button
                            type='button'
                            className='pbBtn'
                            style={{ marginLeft: '20px' }}
                          >
                            <i className='bi bi-clipboard2-check'></i>
                            &nbsp; 제안서
                          </button>
                        </Link>
                        <button
                          type='button'
                          className='pbBtn'
                          style={{ marginLeft: '20px' }}
                          onClick={() => sendConsultRequest(vip[index].vipId)}
                        >
                          <i className='bi bi-person-rolodex'></i>
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
