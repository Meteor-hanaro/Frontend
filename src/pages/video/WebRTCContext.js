import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const WebRTCContext = createContext(null);

export const useWebRTC = () => useContext(WebRTCContext);

const WebRTCProvider = ({ signaling, children }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [pc, setPc] = useState(null);
    const [dataChannel, setDataChannel] = useState(null);

    useEffect(() => {
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
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // 데이터 채널 설정
        const channel = peerConnection.createDataChannel('chat');
        channel.onopen = () => console.log('Data channel is open');
        setDataChannel(channel);

        // 데이터 채널 수신 설정
        peerConnection.ondatachannel = (event) => {
            const receiveChannel = event.channel;
            receiveChannel.onmessage = (event) => {
                alert(`저쪽에서.. "${event.data}"랍니다.`);
            };
        };

        setPc(peerConnection);

        return () => {
            peerConnection.close();
        };
    }, [signaling]);

    useEffect(() => {
        // 페이지 로드 시 본인의 비디오 스트림을 가져와 설정
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                stream.getTracks().forEach((track) => {
                    if (pc) {
                        pc.addTrack(track, stream);
                    }
                });
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getUserMedia();
    }, [pc]);

    const createOffer = async () => {
        try {
            if (pc) {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                signaling.send(JSON.stringify({ offer }));
            } else {
                console.error('PeerConnection not initialized.');
            }
        } catch (error) {
            console.error('Error creating offer:', error);
        }
    };

    const handleSignalingData = async (data) => {
        if (!pc) return;

        try {
            if (data.offer) {
                await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                stream.getTracks().forEach((track) => {
                    if (pc) {
                        pc.addTrack(track, stream);
                    }
                });

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                signaling.send(JSON.stringify({ answer }));
            } else if (data.answer) {
                await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data['new-ice-candidate']) {
                await pc.addIceCandidate(new RTCIceCandidate(data['new-ice-candidate']));
            }
        } catch (error) {
            console.error('Error handling signaling data', error);
        }
    };

    useEffect(() => {
        signaling.onmessage = (message) => {
            handleSignalingData(JSON.parse(message.data));
        };
    }, [handleSignalingData, signaling, pc]);

    const sendMessage = (message) => {
        if (dataChannel && dataChannel.readyState === 'open') {
            dataChannel.send(message);
        }
    };

    return (
        <WebRTCContext.Provider value={{
            localVideoRef,
            remoteVideoRef,
            createOffer,
            sendMessage
        }}>
            {children}
        </WebRTCContext.Provider>
    );
};

export default WebRTCProvider;
