import Sign from '../Sign';
import ContractPage from './ContractPage';
import IdVerificationPage from './IdVerificationPage';
import ProgressBarPage from './ProgressBarPage';
import SharingPage from './SharingPage';
import SignPage from './SignPage';
import { useWebRTC } from './WebRTCContext';
import React from 'react';

const WebRTC = () => {
    const { localVideoRef, remoteVideoRef } = useWebRTC();
    const { createOffer, sendMessage } = useWebRTC();

    const handleSendMessage = () => {
        const txt = document.getElementById('txt');
        if (txt) {
            sendMessage(txt.value);
            txt.value = '';
        }
    };
    return (
        <div id="videoContainer">
            <div id="divVideos">
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={createOffer}>Create Offer</button> <br/>

                <h2>PB</h2>
                <video
                    id="localVideo"
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                />
                <br />
                <h2>User</h2>
                <video
                    id="remoteVideo"
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                /> <br/>     

                <input id="txt" type="text" /> <br />
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleSendMessage}>Send Message</button>
            </div>

            <div id="divInteraction">
                <ProgressBarPage />
                {/* <IdVerificationPage localVideoRef={localVideoRef} /> */}
                <SignPage />
                {/* <SharingPage /> */}
            </div>
        </div>
    );
};

export default WebRTC;
