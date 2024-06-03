import Header from './../../components/common/Header';
import Sidebar from './../../components/pb/Sidebar';
import Main from './../../components/pb/Main';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
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
