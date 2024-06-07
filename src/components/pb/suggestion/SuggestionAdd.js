import { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionCard from './SuggestionCard';
import { useNavigate } from 'react-router-dom';


function SuggestionList({ id }) {
  const navigate = useNavigate();

  const [suggestionItemList, setSuggestionItemList] = useState([]);
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
    navigate('/add-suggestion');
  }

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/extract?userId=` +
          id
      )
      .then((res) => {
        // console.log(res.data);
        setSuggestionItemList(res.data);
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
        {suggestionItemList &&
          suggestionItemList.suggestionItems.map((item, index) => (
            <SuggestionCard
              data={makingChartData(item)}
              name={item.suggestionName}
            />
          ))}
      </div>
      <button className='btn btn-success add-suggestion-btn'>Add suggestion</button> 
    </div>
  );
}

export default SuggestionList;
