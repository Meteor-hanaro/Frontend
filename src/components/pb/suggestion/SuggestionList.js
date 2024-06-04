import { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionCard from './SuggestionCard';

function SuggestionList({ id }) {
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

  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}:8080/api/suggestion/extract?userId=` +
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
    <div id="main" className="d-flex">
      {suggestionItemList &&
        suggestionItemList.suggestionItems.map((item, index) => (
          <SuggestionCard
            data={makingChartData(item)}
            name={item.suggestionName}
          />
        ))}
    </div>
  );
}

export default SuggestionList;
