import { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionCard from './SuggestionCard';
import { useNavigate } from 'react-router-dom';

function SuggestionList({ id }) {
  const navigate = useNavigate();

  const [suggestionDto, setSuggestionDto] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameResizing = (data) => {
    return data.length > 10 ? data.substring(0, 10) + '...' : data;
  };

  const makingChartData = (data) =>
    data &&
    data.suggestionItems.map((item) => ({
      value: item.suggestionValue,
      name: nameResizing(item.suggestionItemName),
    }));

  const handleAddSuggestion = () => {
    // 현재 user의 포트폴리오를 복붙해서 새로운 suggestion을 만들어준다.
    axios
      .post(
        `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/append?vipId=` +
          id
      )
      .then((res) => {
        console.log(res.data);
        navigate(`/pb/suggestion/add`, { state: { suggestionId: res.data } });
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/extract?userId=` +
          id
      )
      .then((res) => {
        
        setSuggestionDto(res.data);
        console.log(res.data);
        setLoading(true);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='suggestion-list-page vertical-align'>
      <div id='main' className='d-flex'>
        {suggestionDto &&
          suggestionDto.suggestionItems.map((item, index) => (
            <SuggestionCard
              id={item.suggestionId}
              data={makingChartData(item)}
              name={item.suggestionName}
            />
          ))}
      </div>
      <button
        className='btn btn-success add-suggestion-btn'
        onClick={handleAddSuggestion}
      >
        Add suggestion
      </button>
    </div>
  );
}

export default SuggestionList;
