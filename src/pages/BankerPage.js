import Sidebar from '../components/pb/sidebar/Sidebar';
import BankerManagement from '../components/pb/management/management';

function BankerPage() {
  return (
    <>
      <div className="page-wrapper">
        {/* Wrap components in a container */}
        <Sidebar />
        <BankerManagement />
      </div>
    </>
  );
}

export default BankerPage;
