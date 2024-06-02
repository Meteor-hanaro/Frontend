import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import SuggestionList from '../../components/common/SuggestionList';
import TrafficChart from '../../components/common/chart/TrafficChart';

const RebalancingPage = () => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [transferSGData, setTransferSGData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [transferPFData, setTransferPFData] = useState([]);
  const [suggestionName, setSuggestionName] = useState('');

  const [suggestionNumber, setSuggestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const ws = useRef(null);

  const portfolioDetailData = () =>
    portfolioData &&
    portfolioData.portfolioItems.map((item) => ({
      value: item.evaluationAmount,
      name: item.fundName,
    }));

  const suggestionDetailData = (data) =>
    data &&
    data.map((item) => ({
      value: item.suggestionValue,
      name: item.suggestionItemName,
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

  return (
    <div id="divRebalancing">
      <SuggestionList
        setSuggestionNumber={setSuggestionNumber}
        data={suggestionData}
      />
      <div className="d-flex mt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RebalancingPage;
