import Header from "../components/sidebar/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Footer from "../components/sidebar/Footer";
import Main from "../../components/Main";
// import React, { useEffect, useState } from 'react';
// import WebRTC from '../WebRTC';

function MainPage() {
  // const [signaling, setSignaling] = useState(null);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');
  //   ws.onopen = () => {
  //     console.log('Connected to signaling server');
  //   };
  //   setSignaling(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);
  return (
    <>
      <Header />
      <Sidebar />
      {/* {signaling && <WebRTC signaling={signaling} />} */}
      <Main />
      <Footer />
    </>
  );
}

export default MainPage;
