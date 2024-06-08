import { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionCard from './SuggestionCard';
import { useNavigate, useLocation } from 'react-router-dom';

function SuggestionAdd() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [suggestionObtainDto, setSuggestionObtainDto] = useState({});
  const { suggestionId } = location.state || {}; // 전달된 상태에서 suggestionId 추출
  console.log(suggestionId);
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/obtain?suggestion_id=` +
          suggestionId,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json', // 서버가 JSON 형식으로 응답하도록 요청
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSuggestionObtainDto(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id='main'>
        <h3>{suggestionObtainDto.vipName}님에게 드릴 제안입니다.</h3>
        <table className='suggestion-add-table'>
          <thead>
            <tr>
              <th>번호</th>
              <th>종목명</th>
              <th>가입일</th>
              <th>투입금액</th>
              <th>현재가치</th>
              <th>신규투입</th>
            </tr>
          </thead>
          <tbody>
            {suggestionObtainDto.suggestionItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.fundName}</td>
                <td>
                  {item.fundInitDate[0]}-{item.fundInitDate[1]}-
                  {item.fundInitDate[2]}
                </td>
                <td>{item.fundInitValue.toLocaleString('ko-KR')}</td>
                <td>{item.fundCurrentValue.toLocaleString('ko-KR')}</td>
                <td>
                  <input type='number' className='newInput' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SuggestionAdd;
