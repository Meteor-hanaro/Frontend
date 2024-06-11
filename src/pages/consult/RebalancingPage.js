import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SuggestionList from '../../components/common/SuggestionList';
import TrafficChart from '../../components/common/chart/TrafficChart';
import { use } from 'echarts';

const RebalancingPage = ({ setSuggestionItemList, setSuggestionItemNumber, setSuggestionId }) => {
  const ws = useRef(null);
  const [suggestionData, setSuggestionData] = useState([]);
  const [transferSGData, setTransferSGData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [transferPFData, setTransferPFData] = useState([]);
  const [suggestionName, setSuggestionName] = useState('');
  const [tmpSuggestionId, setTmpSuggesgtionId] = useState('');
  const [suggestionNumber, setSuggestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const nameResizing = (data) => {
    return data.length > 7 ? data.substring(0, 7) + '...' : data;
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
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/portfolio/extract?vipId=` +
          searchParams.get('vipId')
      )
      .then((res) => {
        setPortfolioData(res.data);
        setSuggestionId(res.data.id);
        setTmpSuggesgtionId(res.data.id);
      })
      .catch((e) => console.log(e));

    // 수정안 데이터 불러오기
    axios
      .get(
        `http://${process.env.REACT_APP_BESERVERURI}/api/suggestion/extract?userId=` +
          searchParams.get('vipId')
      )
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
  const suggestionAccept = (suggestionNumber) => {
    const newSuggestionList = suggestionData.suggestionItems[
      suggestionNumber
    ].suggestionItems
      .filter((item) => existCheckInPortfolio(item.suggestionItemId))
      .map((item) => item.suggestionItemId);
      setSuggestionItemList(newSuggestionList, transferSGData, tmpSuggestionId);
  };

  // 수정안 중 새로 가입하는 펀드 확인
  const existCheckInPortfolio = (id) => {
    return !(
      portfolioData &&
      portfolioData.portfolioItems.find((item) => Object.is(item.fundId, id))
    );
  };

  return (
    <div id="divRebalancing" className="mt-3">
      <div className="d-flex">
        <div style={{ width: '50%' }}></div>
        <div className="d-flex align-items-center">
          <SuggestionList
            setSuggestionNumber={setSuggestionNumber}
            data={suggestionData}
          />
          <button
            className="btn btn-success m-2"
            onClick={() => suggestionAccept(suggestionNumber)}
          >
            {suggestionName} 반영
          </button>
        </div>
      </div>
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
