import axios from "axios";
import { useState, useEffect } from "react";
import SuggestionList from "../../components/common/SuggestionList";
import TrafficChart from "../../components/common/chart/TrafficChart";

const RebalancingPage = () => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [transferData, setTransferData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [transferPFData, setTransferPFData] = useState([]);

  const [suggestionNumber, setSuggestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const portfolioDetailData = () =>
    portfolioData &&
    portfolioData.portfolio_item.map((item) => ({
      value: item.evaluationAmount,
      name: item.fund.name,
    }));

  const suggestionDetailData = (idx) =>
    suggestionData &&
    suggestionData.suggestion_list[idx].map((item) => ({
      value: item.fundValue,
      name: item.fund.name,
    }));

  useEffect(() => {
    // 현재 포트폴리오 불러오기
    axios
      .get("http://localhost:8080/api/portfolio/extract?userId=3")
      .then((res) => {
        setPortfolioData(res.data);
      })
      .catch((e) => console.log(e));

    // 수정안 데이터 불러오기
    axios
      .get("http://localhost:8080/api/suggestion/extract?userId=0")
      .then((res) => {
        setSuggestionData(res.data);
        setLoading(true);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // suggestionData가 로드되었고, suggestionNumber가 유효한 값인 경우에만 차트 데이터 업데이트
    if (loading && portfolioData.portfolio_item) {
      setTransferPFData(portfolioDetailData(portfolioData.portfolio_item));
    }

    if (
      loading &&
      suggestionData.suggestion_list &&
      suggestionData.suggestion_list[suggestionNumber]
    ) {
      setTransferData(suggestionDetailData(suggestionNumber));
    }
  }, [loading, suggestionNumber]);

  if (!loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="divRebalancing">
      <div id="comparisonContainer">
        <div id="portfolioContainer">
          <TrafficChart
            data={transferPFData}
            name={portfolioData.portfolio.user.name + "님의 포트폴리오"}
          />
        </div>
        <div id="suggestionContainer">
          <TrafficChart
            data={transferData}
            name={
              suggestionData.suggestion_name_list[suggestionNumber]
                .suggestion_name
            }
          />
        </div>
      </div>
      <div id="suggestionsListContainer">
        <SuggestionList
          setSuggestionNumber={setSuggestionNumber}
          data={suggestionData}
        />
      </div>
    </div>
  );
};

export default RebalancingPage;
