import { useState, useEffect } from 'react';
import axios from '../../config/AxiosConfig';
import ReportChart from '../common/chart/ReportChart';
import EChart from '../common/chart/EChart';
import TrafficChart from '../common/chart/TrafficChart';
import Card from './Card';

function Main() {
  const [data, setData] = useState([]);
  const [securityData, setSecurityData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/consult/admin/allConsultInfo`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e));

    axios
      .get(`/api/security/admin/allSecurities`)
      .then((res) => {
        console.log(res.data);
        setSecurityData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Admin</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg">
              <div className="row">
                {/* Sales Card */}
                <Card
                  type={'sales-card'}
                  cardTitle={'오늘 접속자 수'}
                  cardDrop={'Today Accessor'}
                  cardContent={'145'}
                  cardPercentage={'12%'}
                  cardInDe={'increase'}
                  icon={'bi bi-person-up'}
                />
                {/* Revenue Card */}
                <Card
                  type={'revenue-card'}
                  cardTitle={'진행중인 상담'}
                  cardDrop={'Ongoing consultation'}
                  cardContent={'3'}
                  cardPercentage={'8%'}
                  cardInDe={'increase'}
                  icon={'bi bi-person-video3'}
                />
                {/* Customers Card */}
                <Card
                  type={'customers-card'}
                  cardTitle={'VIP'}
                  cardDrop={'VIP'}
                  cardContent={'30'}
                  cardPercentage={'12%'}
                  cardInDe={'decrease'}
                  icon={'bi bi-people-fill'}
                />
                {/* Customers Card */}
                <Card
                  type={'customers-card'}
                  cardTitle={'PB'}
                  cardDrop={'PB'}
                  cardContent={'6'}
                  cardPercentage={'12%'}
                  cardInDe={'increase'}
                  icon={'bi bi-person-badge-fill'}
                />
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">
                        화상상담방 정보{' '}
                        <span>| WebRTC Consult Room Information</span>
                      </h5>
                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th className="col-3">Consult Room No.</th>
                            <th className="col-4">VIP</th>
                            <th className="col-3">PB</th>
                            <th className="col-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.consultAdminItemDtos &&
                            data.consultAdminItemDtos.map((item, index) => (
                              <tr>
                                <th scope="row">
                                  <a href="index.html">#{item.id}</a>
                                </th>
                                <td>
                                  {item.vipName} &nbsp;
                                  <span className="badge bg-secondary">
                                    {item.riskType}
                                  </span>
                                </td>
                                <td>{item.pbName}</td>
                                <td>
                                  <span className="badge bg-success">
                                    ACTIVE
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* End Recent Sales */}
                {/* Top Selling */}
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        구성 상품 <span>| Securities</span>
                      </h5>
                      <div className="d-flex flex-wrap overflow-auto col-12">
                        {securityData.list &&
                          securityData.list.map((item, index) => (
                            <div className="col-md-6" key={index}>
                              <h5>
                                <span
                                  className={`badge ${
                                    item.fund ? 'bg-dark' : 'bg-info'
                                  }`}
                                >
                                  {item.id}
                                </span>
                                &nbsp; {item.name}
                              </h5>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Main;
