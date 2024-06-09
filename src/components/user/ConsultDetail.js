import { useLocation } from 'react-router-dom';
function ConsultDetail() {
  const location = useLocation();

  console.log(location.state?.consult);

  const pb = location.state?.pb;
  const consult = location.state?.consult;
  const startedAt = consult.startedAt;
  const LocalDateTime2String = `${startedAt[0]}년 ${startedAt[1]
    .toString()
    .padStart(2, '0')}월 ${startedAt[2].toString().padStart(2, '0')}일`;

  return (
    <div id="main-consult">
      <section className="section dashboard">
        <div className="row">
          {/* 상담 개요 */}
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title-consult">상담 개요</h5>
                <div className="activity">
                  <div className="activity-item d-flex">
                    <div className="activite-label">상담 일시</div>
                    <i className="bi bi-circle-fill activity-badge text-success align-self-start" />
                    <div className="activity-content">
                      {LocalDateTime2String}
                    </div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">상담 시간</div>
                    <i className="bi bi-circle-fill activity-badge text-warning align-self-start" />
                    <div className="activity-content">1시간</div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label">담당 PB</div>
                    <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
                    <div className="activity-content">{pb.name}</div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label"></div>
                    <i className="bi bi-circle-fill activity-badge text-primary align-self-start" />
                    <div className="activity-content">{pb.email}</div>
                  </div>
                  <div className="activity-item d-flex">
                    <div className="activite-label"></div>
                    <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                    <div className="activity-content">{pb.phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 상담 내용 */}
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-target="#profile-overview"
                      data-bs-toggle="tab"
                    >
                      상담 내용
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-target="#profile-edit"
                      data-bs-toggle="tab"
                    >
                      반영된 수정안
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <h5 className="card-title-consult">
                    {LocalDateTime2String}에 진행된 상담 정보입니다
                  </h5>
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title-consult">Title</h5>
                    <div className="row">
                      <div className="col-lg-9 col-md-8">{consult.record}</div>
                    </div>
                    <h5 className="card-title-consult">Details</h5>
                    <div className="row">
                      <div className="col-lg-9 col-md-8">{consult.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ConsultDetail;
