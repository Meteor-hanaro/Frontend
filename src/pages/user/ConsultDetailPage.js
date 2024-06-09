import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import ConsultDetail from '../../components/user/ConsultDetail';

function ConsultDetailPage() {
  const params = useParams();

  //   console.log(params);

  return (
    <>
      <Header />
      <img
        src={process.env.PUBLIC_URL + '/assets/img/consultdetail.png'}
        style={{ paddingTop: '60px', height: '30rem', width: '100%' }}
      />
      <ConsultDetail />
    </>
  );
}

export default ConsultDetailPage;
