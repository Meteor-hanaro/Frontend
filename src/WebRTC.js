import React, { useRef, useEffect, useState } from 'react';
import ProgressBarPage from './pages/video/ProgressBarPage';
import RebalancingPage from './pages/video/RebalancingPage';

const WebRTC = ({ signaling }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [pc, setPc] = useState(null);
    const [dataChannel, setDataChannel] = useState(null);

    useEffect(() => {
        const localVideo = localVideoRef.current;
        const remoteVideo = remoteVideoRef.current;

        // STUN 서버 설정
        const configuration = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        };

        // RTCPeerConnection 생성
        const peerConnection = new RTCPeerConnection(configuration);

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                signaling.send(
                    JSON.stringify({ 'new-ice-candidate': event.candidate })
                );
            }
        };

        peerConnection.ontrack = (event) => {
            remoteVideo.srcObject = event.streams[0];
        };

        // 데이터 채널 설정
        const channel = peerConnection.createDataChannel('chat');
        channel.onopen = () => console.log('Data channel is open');
        setDataChannel(channel);

        // 데이터 채널 수신 설정
        peerConnection.ondatachannel = (event) => {
            const receiveChannel = event.channel;
            receiveChannel.onmessage = (event) => {
                alert(`저쪽에서.. "${event.data}" 이랍니다.`);
            };
        };

        setPc(peerConnection);

        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                localVideo.srcObject = stream;
                stream
                    .getTracks()
                    .forEach((track) => peerConnection.addTrack(track, stream));
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getUserMedia();

        signaling.onmessage = async (message) => {
            const data = JSON.parse(message.data);

            if (data.offer) {
                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(data.offer)
                );
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);
                signaling.send(JSON.stringify({ answer }));
            }

            if (data.answer) {
                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(data.answer)
                );
            }

            if (data['new-ice-candidate']) {
                try {
                    await peerConnection.addIceCandidate(
                        new RTCIceCandidate(data['new-ice-candidate'])
                    );
                } catch (error) {
                    console.error('Error adding received ice candidate', error);
                }
            }
        };

        return () => {
            peerConnection.close();
        };
    }, [signaling]);

    const createOffer = async () => {
        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            signaling.send(JSON.stringify({ offer }));
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const sendMessage = () => {
        let txt = document.getElementById('txt');
        if (dataChannel && dataChannel.readyState === 'open') {
            dataChannel.send(txt.value);
        }
        txt.value = '';
    };

    return (
        <div id="videoContainer">
            <div id="divVideos">
                <h2>PB</h2>
                <video
                    id="localVideo"
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    // muted
                />
                <br />
                <h2>User</h2>
                <video
                    id="remoteVideo"
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                />
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={createOffer}>Create Offer</button>
            </div>

            <div id="divInteraction">
                <ProgressBarPage />
                <RebalancingPage />
                <input id="txt" type="text" /> <br />
                <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={sendMessage}>Send Message</button>
            </div>
            <br />
        </div>
    );
};

export default WebRTC;
