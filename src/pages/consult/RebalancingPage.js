import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import SuggestionList from '../../components/common/SuggestionList';
import TrafficChart from '../../components/common/chart/TrafficChart';

const RebalancingPage = ({ setSuggestionItemList }) => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [transferSGData, setTransferSGData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [transferPFData, setTransferPFData] = useState([]);
  const [suggestionName, setSuggestionName] = useState('');

  const [suggestionNumber, setSuggestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const ws = useRef(null);

  const nameResizing = (data) => {
    return data.length > 10 ? data.substring(0, 10) + '...' : data;
  };

  const portfolioDetailData = () =>
    portfolioData &&
    portfolioData.portfolioItems.map((item) => ({
      value: item.evaluationAmount,
      name: nameResizing(item.fundName),
    }));

  const suggestionDetailData = (data) =>
    data &&
    data.map((item) => ({
      value: item.suggestionValue,
      name: nameResizing(item.suggestionItemName),
    }));

  useEffect(() => {
    // 현재 포트폴리오 불러오기
    axios
      .get('http://localhost:8080/api/portfolio/extract?vipId=1')
      .then((res) => {
        setPortfolioData(res.data);
      })
      .catch((e) => console.log(e));

    // 수정안 데이터 불러오기
    axios
      .get('http://localhost:8080/api/suggestion/extract?userId=1')
      .then((res) => {
        setSuggestionData(res.data);
        setLoading(true);
      })
      .catch((e) => console.log(e));

    setSuggestionItemList([]);
  }, []);

  useEffect(() => {
    //suggestionData가 로드되었고, suggestionNumber가 유효한 값인 경우에만 차트 데이터 업데이트
    if (loading && portfolioData.portfolioItems) {
      setTransferPFData(portfolioDetailData());
    }
    if (loading && suggestionData.suggestionItems[suggestionNumber]) {
      setTransferSGData(
        suggestionDetailData(
          suggestionData.suggestionItems[suggestionNumber].suggestionItems
        )
      );
      setSuggestionName(
        suggestionData.suggestionItems[suggestionNumber].suggestionName
      );
    }
  }, [loading, suggestionNumber]);

  if (!loading) {
    return <div>Loading...</div>;
  }

  // 수정안 버튼 클릭시 작성해야할 계약서 리스트 전달
  const suggestionAccept = () => {
    suggestionData.suggestionItems[suggestionNumber].suggestionItems.map(
      (item) => {
        if (existCheckInPortfolio(item.suggestionItemId)) {
          setSuggestionItemList((prev) => [...prev, item.suggestionItemId]);
        }
      }
    );
  };

  // 수정안 중 새로 가입하는 펀드 확인
  const existCheckInPortfolio = (id) => {
    return !(
      portfolioData &&
      portfolioData.portfolioItems.find((item) => Object.is(item.fundId, id))
    );
  };

  return (
    <div id="divRebalancing">
      <SuggestionList
        setSuggestionNumber={setSuggestionNumber}
        data={suggestionData}
      />
      <div className="mt-2 overflow-scroll">
        <div id="comparisonContainer">
          <div id="portfolioContainer">
            <TrafficChart
              data={transferPFData}
              name={portfolioData.userName + '님의 포트폴리오'}
            />
          </div>
        </div>
        <div id="comparisonContainer">
          <div id="portfolioContainer">
            <TrafficChart data={transferSGData} name={suggestionName} />
            <div className="z-1 position-absolute d-flex ">
              <button className="btn btn-danger mx-1">거절</button>
              <button
                className="btn btn-primary mx-1"
                onClick={() => suggestionAccept()}
              >
                수락
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebalancingPage;
