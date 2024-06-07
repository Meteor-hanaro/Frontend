import RootCard from '../RootCard';
import AdminCard from './AdminCard';
import AdminCardSub from './AdminCardSub';

function Main({ infoNumber }) {
  return (
    <div className="container" style={{ marginTop: '5rem' }}>
      <div className="row align-items-md-stretch">
        <AdminCard infoNumber={infoNumber} />
      </div>
    </div>
  );
}

export default Main;
