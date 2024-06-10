import Header from './../../components/common/Header';
import Sidebar from './../../components/pb/Sidebar';
import { useParams } from 'react-router-dom';
import SuggestionList from '../../components/pb/suggestion/SuggestionList';

function SuggestionPage() {
  const params = useParams();
  // params.vipId -> 회원 아이디

  return (
    <>
      <Header />
      <Sidebar />
      <SuggestionList id={params.vipId} />
    </>
  );
}

export default SuggestionPage;
