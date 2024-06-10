import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const WebRTCContext = createContext(null);

export const useWebRTC = () => useContext(WebRTCContext);

const WebRTCProvider = ({
  signaling,
  children,
  isVip,
  isPb,
  vipId,
  pbId,
  consultId,
}) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [pc, setPc] = useState(null);
  const [dataChannel, setDataChannel] = useState(null);
  const [participants, setParticipants] = useState(0);
  const [ws, setWs] = useState(null);
  let isOpen = false;

  useEffect(() => {
    console.log(signaling);
    const websocket = new WebSocket(
      `${process.env.REACT_APP_WEBRTCWS}/${consultId}`
    );

    websocket.onopen = () => {
      isOpen = true;
      const message = JSON.stringify({
        isOpen,
        isVip,
        isPb,
        vipId,
        pbId,
        consultId,
      });
      websocket.send(message);
    };

    websocket.onmessage = (message) => {
      // alert(message.data);
      // let msg = message.data;
      const data = JSON.parse(message.data);
      if (data.type === 'participants') {
        setParticipants(data.count);
      }
      // let isVipOverflow = JSON.parse(msg).vipOverflow;
      // let isPbOverflow = JSON.parse(msg).pbOverflow;
      if (data.vipOverflow || data.pbOverflow) {
        alert('이미 진행 중인 상담입니다.');
        window.close();
      }
    };

    // setWs(websocket);

    const handleBeforeUnload = () => {
      if (websocket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({
          isOpen: false,
          isVip,
          isPb,
          vipId,
          pbId,
        });
        websocket.send(message);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (websocket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({
          isOpen: false,
          isVip,
          isPb,
          vipId,
          pbId,
        });
        websocket.send(message);
        websocket.close();
      }
      websocket.close();
    };
  }, [isVip, isPb, vipId, pbId]);

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
        alert(`Received message: "${event.data}"`);
      };
    };

    setPc(peerConnection);

    return () => {
      peerConnection.close();
    };
  }, [participants, signaling]);

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
          if (pc && pc.signalingState !== 'closed') {
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
    if (pc) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      signaling.send(JSON.stringify({ offer: pc.localDescription }));
    } else {
      console.error('PeerConnection not initialized.');
    }
  };

  const handleSignalingData = async (data) => {
    console.log(pc);
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
          if (pc && pc.signalingState !== 'closed') {
            pc.addTrack(track, stream);
          }
        });

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signaling.send(JSON.stringify({ answer }));
      } else if (data.answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data['new-ice-candidate']) {
        await pc.addIceCandidate(
          new RTCIceCandidate(data['new-ice-candidate'])
        );
      }
    } catch (error) {
      console.error('Error handling signaling data', error);
    }
  };

  useEffect(() => {
    signaling.onmessage = (message) => {
      console.log(message.data);
      message &&
        message.data.text().then((text) => {
          handleSignalingData(JSON.parse(text));
        });
    };
  }, [handleSignalingData, signaling, pc]);

  const sendMessage = (message) => {
    if (dataChannel && dataChannel.readyState === 'open') {
      dataChannel.send(message);
    }
  };

  return (
    <WebRTCContext.Provider
      value={{
        localVideoRef,
        remoteVideoRef,
        createOffer,
        sendMessage,
      }}
    >
      {children}
    </WebRTCContext.Provider>
  );
};

export default WebRTCProvider;
