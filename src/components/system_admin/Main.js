import RootCard from '../RootCard';
import AdminCard from './AdminCard';
import AdminCardSub from './AdminCardSub';
import { useEffect } from 'react-router-dom';

function Main({ infoNumber }) {
  // useEffect(() => {}, [infoNumber]);
  return (
    <div className="container" style={{ marginTop: '5rem' }}>
      {infoNumber === 0 ? (
        <AdminCard infoNumber={infoNumber} />
      ) : (
        <div className="row align-items-md-stretch">
          <AdminCard infoNumber={infoNumber} />
        </div>
      )}
    </div>
  );
}

export default Main;
