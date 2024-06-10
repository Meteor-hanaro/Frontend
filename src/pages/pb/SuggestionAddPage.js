import Header from '../../components/common/Header';
import SideBar from '../../components/pb/Sidebar';
import { useParams } from 'react-router-dom';
import SuggestionAdd from '../../components/pb/suggestion/SuggestionAdd';

function SuggestionAddPage() {
  const params = useParams();
  // params.vipId -> 회원 아이디

  return (
    <>
      <Header />
      <SideBar />
      <SuggestionAdd />
    </>
  );
}

export default SuggestionAddPage;
