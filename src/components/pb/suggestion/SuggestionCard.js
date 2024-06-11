import TrafficChart from '../../common/chart/TrafficChart';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/AxiosConfig';
import { useState } from 'react';

function SuggestionCard({ id, data, name }) {
  const navigate = useNavigate();

  const [suggestionId, setSuggestionId] = useState(id);
  const handleDelete = () => {
    // 삭제 로직
    axios
      .get('/api/suggestion/remove?suggestion_id=' + id)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
        alert('삭제되었습니다.');
      })
      .catch((e) => console.log(e));
  };

  const handleSeeDetail = () => {
    navigate('/pb/suggestion/add', { state: { suggestionId: suggestionId } });
  };

  return (
    <div className="card mx-2" style={{ width: '40rem', position: 'relative' }}>
      <TrafficChart data={data} name={name} />
      <button
        className="btn-close"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        aria-label="Close"
        onClick={handleDelete}
      ></button>
      <div className="card-body mt-3">
        {/* <h4 className="card-title">John Doe</h4> */}
        <p className="card-text"></p>
        <button onClick={handleSeeDetail} className="btn btn-secondary">
          See Detail
        </button>
      </div>
    </div>
  );
}

export default SuggestionCard;
