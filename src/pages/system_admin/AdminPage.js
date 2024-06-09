import Header from '../../components/system_admin/Header';
import Main from '../../components/system_admin/Main';
import { useState, useEffect } from 'react';
// import Main from '../../components/etc/Main';

function AdminPage() {
  const [infoNumber, setInfoNumber] = useState(0);

  useEffect(() => {
    console.log(infoNumber);
  }, [infoNumber]);

  return (
    <>
      <Header setInfoNumber={setInfoNumber} />
      {/* <Main infoNumber={infoNumber} /> */}
      <Main infoNumber={infoNumber} />
    </>
  );
}

export default AdminPage;
