import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import auth from '../../auth';

function Main() {
  const ws = useRef(null);
  const navigate = useNavigate();
  const [isPause, setIsPause] = useState(true); // vip 접속 확인 허용 변수
  const [vip, setVip] = useState([]);
  const [state, setState] = useState([]);
  const [pbId, setPbId] = useState('');
  const [consultState, setConsultState] = useState([]);
  const [consultData, setConsultData] = useState([]);

  useEffect(() => {
    // web socket
    ws.current = new WebSocket(`${process.env.REACT_APP_CONSULTREQUEST}`);

    // 1. /pb/main 최초 진입 시, vip 목록 가져오기
    async function fetchData() {
      try {
        const res = await auth.get(
          `http://${process.env.REACT_APP_BESERVERURI}/api/pb/main`
        );
        setVip(res.data.vip);
        setState(res.data.state);
        setPbId(res.data.vip[0].pbId);
        setIsPause(false); // vip 접속 확인 허용
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

    // 일정 시간 간격으로 state 정보 갱신
    // const intervalId = setInterval(getUserState, 2000);
    // return () => clearInterval(intervalId);
  }, [pbId]);

  useEffect(() => {
    if (vip.length > 0) {
      setConsultState(vip.map((item) => ({ vipId: item.vipId, state: false })));

      axios
        .get(
          `http://${process.env.REACT_APP_BESERVERURI}/api/consult/searchPbVipConsult?pbId=${pbId}`
        )
        .then((res) => {
          setConsultData(res.data.isExistConsult);
        })
        .catch((e) => console.log(e));
    }
  }, [vip]);

  useEffect(() => {
    consultState.map((item, index) => {
      consultData.map((item2) => {
        if (item.vipId === item2.vipId) consultState[index].state = true;
      });
    });
  }, [consultState]);

  // 2. /pb/main vip 검색
  const searchUser = () => {
    setIsPause(true); // vip 접속 확인 비허용

    const url = `http://${process.env.REACT_APP_BESERVERURI}/api/pb/main/filter`;
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
  // useEffect(() => {
  //   if (!isPause) {
  //     const intervalId = setInterval(() => getUserState(vip), 4000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [isPause]); // isPause이 변경될 때마다 useEffect 수행

  // redis에서 고객 입장여부 실시간 확인
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

  const sendConsultRequest = (vipId) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      console.log('send from pb to vip : ' + vipId);
      ws.current.send(vipId);
    }
  };

  // 고객과의 상담 생성
  const registerConsult = (data, index) => {
    axios
      .post(
        `http://${process.env.REACT_APP_BESERVERURI}/api/consult/registerConsult`,
        {
          pbId: data.pbId,
          vipId: data.vipId,
          content: '상담',
        }
      )
      .then((res) => {
        setConsultState((prev) => {
          const changeConsultState = [...prev];
          changeConsultState[index].state = true;
          return changeConsultState;
        });
        console.log('ok');
        alert(`${data.name}님과의 화상 상담방이 생성되었습니다.`);
      })
      .catch((e) => console.log(e));
    sendConsultRequest(data.vipId);
  };

  // pb가 상담방 입장할 때 적절한 상담방으로 입장하게끔 url 생성 및 페이지 open
  const enterRtcRoom = (data, index) => {
    const roomNumber = consultData.find((item) =>
      Object.is(data.vipId, item.vipId)
    ).consultId;
    window.open(`/pb/videoPage/${roomNumber}?pbId=${pbId}&vipId=${data.vipId}`);
    localStorage.setItem('isPb', true);
    localStorage.setItem('pbVip', data.vipId);
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
        <div
          className="alignHorizontal search-bar"
          style={{ marginTop: '25px' }}
        >
          <select className="datatable-selector">
            <option>전체</option>
            <option>STABLE</option>
            <option>CONSERVATIVE</option>
            <option>NEUTRAL</option>
            <option>GROWTH</option>
            <option>AGGRESSIVE</option>
          </select>
          <input
            className="search-form"
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button
            className="search-button"
            type="submit"
            title="Search"
            onClick={() => searchUser()}
          >
            <i className="bi bi-search" />
          </button>
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
                          <i className="bi bi-clipboard2-data"></i>
                          포트폴리오
                        </button>
                        <Link to={`/pb/suggestion/${vip[index].vipId}`}>
                          <button
                            type="button"
                            className="pbBtn"
                            style={{ marginLeft: '20px' }}
                          >
                            <i className="bi bi-clipboard2-check"></i>
                            &nbsp; 제안서
                          </button>
                        </Link>
                        {/* 진행할 상담이 있다면 상담 입장, 상담을 생성해야 한다면 상담 신청 */}
                        {consultState.length > 0 &&
                        consultState[index].state === false ? (
                          <button
                            type="button"
                            className="pbBtn"
                            style={{ marginLeft: '20px' }}
                            onClick={() => registerConsult(vip[index], index)}
                          >
                            <i className="bi bi-person-rolodex"></i>
                            &nbsp; 상담 신청
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="pbBtn btn btn-danger"
                            style={{ marginLeft: '20px' }}
                            onClick={() => enterRtcRoom(vip[index], index)}
                          >
                            <i className="bi bi-person-rolodex"></i>
                            &nbsp; 상담 입장
                          </button>
                        )}
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
