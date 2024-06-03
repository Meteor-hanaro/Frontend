import TrafficChart from '../../common/chart/TrafficChart';
import { Link } from 'react-router-dom';

function SuggestionCard({ data, name }) {
  console.log(data);
  return (
    <div className="card mx-2" style={{ width: '40rem' }}>
      <TrafficChart data={data} name={name} />
      <div className="card-body mt-3">
        {/* <h4 className="card-title">John Doe</h4> */}
        <p className="card-text">
          2024년 06월 03일 13시 40분 35초에 저장한 USER1의 포트폴리오
          수정안입니다
        </p>
        <Link to="#" className="btn btn-secondary">
          See Detail
        </Link>
      </div>
    </div>
  );
}

export default SuggestionCard;
