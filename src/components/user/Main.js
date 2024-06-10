import { useEffect, useRef, useState } from 'react';
import auth from '../../auth';
import ConsultCard from '../../components/user/ConsultCard';

function Main() {
  const ws = useRef(null);
  const [pb, setPb] = useState([]);
  const [vip, setVip] = useState([]);
  const [requestVipId, setRequestVipId] = useState('');
  const [consult, setConsult] = useState([]);

  useEffect(() => {
    // web socket
    ws.current = new WebSocket(`ws://${process.env.REACT_APP_CONSULTREQUEST}`);
    ws.current.onmessage = (event) => {
      event.data
        .text()
        .then((text) => {
          setRequestVipId(text);
        })
        .catch((error) => {
          console.error('Error while parsing message:', error);
        });
    };

    auth
      .get(`http://${process.env.REACT_APP_BESERVERURI}/api/vip/main`)
      .then((res) => {
        localStorage.setItem('vipId', res.data.vipInfo.vipId);
        console.log(res.data.vipInfo.hasConsult);
        setPb(res.data.pbInfo);
        setVip(res.data.vipInfo);
        setConsult(res.data.consultList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const clickEnterButton = () => {
    window.open(`./videoPage/:params`, '_blank', 'noopener,noreferrer');
    localStorage.setItem('isVip', vip.isvip);
  };

  return (
    <>
      <main
        id="main"
        className="main"
        style={{
          padding: '45px',
          marginLeft: '5%',
          marginRight: '5%',
          height: `calc(100vh - 60px)`,
        }}
      >
        <div
          className="pagetitle alignHorizontal"
          style={{
            height: '100%',
          }}
        >
          <div
            className="alignVertical"
            style={{
              width: '35%',
            }}
          >
            <div
              className="card info-card alignVertical"
              style={{ height: '47%', padding: '7% 7%' }}
            >
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                VIP
              </span>
              <div
                className="alignHorizontal"
                // style={{
                //   marginTop: '5%',
                // }}
              >
                <div style={{ fontSize: '26px', fontWeight: '540' }}>
                  <div>
                    <span style={{ fontSize: '35px', fontWeight: '750' }}>
                      {vip.name}{' '}
                    </span>
                    님<div style={{ marginTop: '3px' }}>건행하세요 😊</div>
                  </div>
                </div>
                <div>
                  <div>
                    <span
                      style={{
                        fontSize: '22px',
                        fontWeight: '550',
                        color: '#009476',
                      }}
                    >
                      {vip.riskType}
                    </span>
                    <div
                      style={{
                        marginTop: '0.5px',
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#5F5F5F',
                      }}
                    >
                      최근 검사일 {vip.riskTestDate}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {localStorage.getItem('hasConsult') === 'true' ? (
                  <p>담당 PB가 상담을 요청하였습니다.</p>
                ) : null}
                <button
                  type="button"
                  className="enterButton"
                  style={{ marginBottom: '0px' }}
                  disabled={
                    localStorage.getItem('hasConsult') !== 'true' &&
                    requestVipId !== localStorage.getItem('vipId')
                  }
                  onClick={clickEnterButton}
                >
                  상담 바로 입장하기
                </button>
              </div>
            </div>
            <div
              className="card info-card alignVertical"
              style={{ height: '47%', padding: '7% 7%', marginBottom: '0px' }}
            >
              <div className="d-flex">
                <div className="w-50">
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#D7B863',
                    }}
                  >
                    PB
                  </span>
                  <div style={{ fontSize: '23px', fontWeight: '540' }}>
                    담당{' '}
                    <span style={{ fontSize: '26px', fontWeight: '750' }}>
                      {pb.name}
                    </span>
                  </div>
                </div>
                <div className="w-50 d-flex justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + '/assets/img/profile-img.jpg'}
                    alt="Profile"
                    className="rounded-circle"
                  />
                </div>
              </div>

              <div
                className="alignHorizontal"
                style={{
                  height: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100% !important',
                }}
              >
                {/* <div>
                  <img
                    src={process.env.PUBLIC_URL + '/assets/img/profile-img.jpg'}
                    alt="Profile"
                    className="rounded-circle"
                  />
                </div> */}
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: '550',
                    color: '#5F5F5F',
                    // marginLeft: 'auto',
                    // marginRight: 'auto 0px',
                  }}
                >
                  <div>
                    <div className="d-flex w-100">
                      <div className="w-50">
                        <span className="badge bg-success">E-Mail</span>
                        <h6 className="m-2">{pb.email}</h6>
                      </div>
                      <div className="w-50">
                        <span className="badge bg-success">Phone</span>
                        <h6 className="m-2">{pb.phone}</h6>
                      </div>
                    </div>

                    <span className="badge bg-secondary">Introduce</span>
                    <h6 className="m-2">{pb.introduce}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: '5%', width: '60%', height: '100%' }}>
            <div
              className="card info-card"
              style={{ height: '100%', padding: '4% 4%' }}
            >
              <span
                style={{
                  marginBottom: '15px',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#D7B863',
                }}
              >
                상담 이력
              </span>
              {consult.map((item) => (
                <ConsultCard consult={item} pb={pb} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main;
