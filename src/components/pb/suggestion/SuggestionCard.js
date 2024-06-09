import TrafficChart from '../../common/chart/TrafficChart';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SuggestionCard({ id, data, name }) {

  const handleDelete = () => {
    // 삭제 로직
    axios.get('http://localhost:8080/api/suggestion/remove?suggestion_id=' + id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        alert('삭제되었습니다.');
      })
      .catch((e) => console.log(e));
  }

  console.log(data);
  return (
    <div className='card mx-2' style={{ width: '40rem', position: 'relative' }}>
      <TrafficChart data={data} name={name} />
      <button
        className='btn-close'
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        aria-label='Close'
        onClick={handleDelete}
      ></button>
      <div className='card-body mt-3'>
        {/* <h4 className="card-title">John Doe</h4> */}
        <p className='card-text'>
          2024년 06월 03일 13시 40분 35초에 저장한 포트폴리오 수정안입니다
        </p>
        <Link to='#' className='btn btn-secondary'>
          See Detail
        </Link>
      </div>
    </div>
  );
}

export default SuggestionCard;
