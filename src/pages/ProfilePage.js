import Header from '../components/sidebar/Header';
import Sidebar from '../components/sidebar/Sidebar';
import ProfileCard from '../components/user/ProfileCard';
import Footer from '../components/sidebar/Footer';
import ProfileDetail from '../components/user/ProfileDetail';

function ProfilePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <ProfileCard />
            </div>
            <div className="col-xl-8">
              <ProfileDetail />
            </div>
          </div>
        </section>
      </main>
      {/* End #main */}
      <Footer />
    </>
  );
}

export default ProfilePage;
