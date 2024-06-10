import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function SuggestionAdd() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [suggestionObtainDto, setSuggestionObtainDto] = useState({});
  const { suggestionId } = location.state || {}; // 전달된 상태에서 suggestionId 추출

  console.log(suggestionId);

  const handleApplySuggestion = () => {
    const suggestionItems = Array.from(
      document.querySelectorAll('.suggestion-add-table tbody tr')
    ).map((tr) => {
      const suggestionItemId = tr.children[0].innerText;
      let newValue = tr.querySelector('.newInput').value;

      if (!newValue) {
        newValue = tr
          .querySelector('.suggestion-current-value')
          .innerText.replace(/,/g, ''); // fundCurrentValue 값을 사용 (쉼표 제거)
      }

      return {
        suggestionItemId: parseFloat(suggestionItemId),
        newValue: parseFloat(newValue),
      };
    });

    console.log({ suggestionApplyRequestItemDtoList: suggestionItems });
    // axios 통신을 이용하여 controller에 데이터 전송
    axios
      .post(
        'http://localhost:8080/api/suggestion/apply',
        {
          suggestionId: suggestionId,
          suggestionName: document.getElementById('suggestion-name').value,
          suggestionApplyRequestItemDtoList: suggestionItems,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('응답:', response.data);
        alert('수정안이 성공적으로 적용되었습니다.');
      })
      .catch((error) => {
        console.error('오류:', error);
        alert('수정안 적용에 실패하였습니다.');
      });

    navigate('/pb/main');
  };

  const handleAddFund = () => {
    navigate('/pb/suggestion/fund/add', { state: { suggestionId: suggestionId } });
  };

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
              <th style={{ display: 'none' }}></th>
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
                <td style={{ display: 'none' }}>{item.suggestionItemId}</td>
                <td className='suggestion-item-idx'>{index + 1}</td>
                <td className='suggestion-fund-name'>{item.fundName}</td>
                <td className='suggestion-init-date'>
                  {item.fundInitDate[0]}-{item.fundInitDate[1]}-
                  {item.fundInitDate[2]}
                </td>
                <td className='suggestion-init-value'>
                  {item.fundInitValue.toLocaleString('ko-KR')}
                </td>
                <td className='suggestion-current-value'>
                  {item.fundCurrentValue.toLocaleString('ko-KR')}
                </td>
                <td className='suggestion-new-value'>
                  <input type='number' className='newInput' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='alignVertical'>
          <button
            className='btn btn-primary add-fund-btn'
            onClick={handleAddFund}
          >
            Add Fund
          </button>
          <input
            id='suggestion-name'
            type='text'
            className='suggestion-name'
            placeholder='제안안 이름'
          />
          <button
            className='btn btn-primary modify-suggestion-btn'
            onClick={handleApplySuggestion}
          >
            Apply suggestion
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestionAdd;
