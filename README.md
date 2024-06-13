# Frontend

😎 Gold Rounge의 Front Repository

## 🚀 개발 환경
<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=Bootstrap&logoColor=white"/><img src="https://img.shields.io/badge/5.3.3-515151?style=flat-square">
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/><img src="https://img.shields.io/badge/18.3.1-515151?style=flat-square">
<img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white"/><img src="https://img.shields.io/badge/10.7.0-515151?style=flat-square">
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=Node.js&logoColor=white"/><img src="https://img.shields.io/badge/20.14.0-515151?style=flat-square">
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/><img src="https://img.shields.io/badge/1.24.0-515151?style=flat-square">

<img src="https://img.shields.io/badge/AWS ec2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=WebRTC&logoColor=white"/>

## 🚃 개발 기술
### React
- 컴포넌트화를 통해 유지보수와 재사용성 고려
- Virtual DOM을 사용하여 실제 DOM 조작을 최소화. 성능 최적화 및 빠른 UI 업데이트 가능
- 다양한 라이브러리와 도구를 함께 사용할 수 있으며, React Router를 사용해 복잡한 라우팅 관리하고 Redux를 통한 상태관리 가능
- Hooks를 통해 보다 간결하고 이해하기 쉬운 코드 작성 가능
### Bootstrap
- 미리 정의된 CSS 클래스와 컴포넌트를 사용해 빠르게 프로토타입 제작. 개발시간 단축
- 통일된 디자인 시스템 제공을 통한 일관된 사용자 경험 보장
- 주요 웹 브라우저와 호환이 가능하여 다양한 환경에서 일관된 동작 보장
- 다양한 JavaSCript 플러그인들이 포함되어 있어 상호작용 요소를 쉽게 추가 가능
### Nginx
- 이벤트 기반 아키텍처를 사용하여 높은 성능 발휘. 많은 수의 동시 연결을 효율적으로 처리할 수 있어 높은 트래픽을 처리하는데 유리
- 수평 확장에 유리하며 리버스 프록시와 로드 밸런싱 기능을 통해 트래픽을 여러 서버에 분산시켜 처리할 수 있음
- 클라이언트 요청을 백엔드 서버로 전달하고 응답을 반환할 수 있음. 애플리케이션 서버와 데이터베이스 서버를 보호하고 SSL 종료와 같은 작업을 처리하는데 유용함
- 모듈 방식으로 설계되어 있어 필요에 따라 다양한 기능을 추가하거나 제거할 수 있음. 설정 파일을 통해 다양한 기능을 유연하게 구성할 수 있음
### Amazon EC2
- 사용자의 필요에 따라 쉽게 확장 가능. Auto Scaling 기능을 통해 트래픽이 증가하면 자동으로 인스턴스를 추가하고 트래픽이 감소하면 인스턴스를 줄여 비용 효율성 극대화 가능
- 보안 그룹, 네트워크 ACL, IAM 역할등을 통해 세분화된 보안 설정 가능
- RDS, S3, VPC, ELB 등과 통합하여 전체 애플리케이션 아키텍처를 쉽게 구성 가능. 애플리케이션 개발 및 운영의 복잡성을 줄이고 효율성을 높임
### WebRTC(Web Real-Time Communication)
- 지연 시간이 거의 없는 실시간 오디오, 비디오, 데이터 통신 제공
- 대부분의 트래픽을 P2P(peer-to-peer) 방식으로 전달해 서버 부하를 줄이고 대역폭 사용 최적화
- 주요 웹 브라우저와 호환 가능. 별도의 플러그인이나 추가 소프트웨어 없이도 실시간 통신 기능을 웹 애플리케이션에 쉽게 통합 가능
- RTCDataChannel API를 통해 브라우저 간에 데이터도 주고받을 수 있음. 파일 전송, 게임 데이터 공유, 실시간 채팅 등의 기능 구현 가능

## 🌱 프로젝트 구조
```
meteor-frontend
└─ Frontend
   ├─ .env
   ├─ README.md
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ assets
   │     ├─ css
   │     │  ├─ style.css
   │     │  └─ video.css
   │     └─ fonts
   │        ├─ Hana2-Medium.otf
   │        └─ Hana2-Medium.ttf
   └─ src
      ├─ Router.js
      ├─ SetupProxy.js
      ├─ auth.js
      ├─ components
      │  ├─ RootCard.js
      │  ├─ common
      │  │  ├─ FundCheckItem.js
      │  │  ├─ FundContract.js
      │  │  ├─ Header.js
      │  │  ├─ Login.js
      │  │  ├─ Pdf.js
      │  │  ├─ SuggestionList.js
      │  │  ├─ chart
      │  │  │  ├─ EChart.js
      │  │  │  ├─ ReportChart.js
      │  │  │  └─ TrafficChart.js
      │  │  └─ form
      │  │     └─ TextEditor.js
      │  ├─ consult
      │  │  └─ Header.js
      │  ├─ etc
      │  │  ├─ Card.js
      │  │  └─ Main.js
      │  ├─ pb
      │  │  ├─ ConsultRegister.js
      │  │  ├─ Main.js
      │  │  ├─ Sidebar.js
      │  │  ├─ fund
      │  │  │  ├─ fundDetail.js
      │  │  │  ├─ fundDetailForAddition.js
      │  │  │  └─ fundList.js
      │  │  ├─ portfolio
      │  │  │  ├─ portfolioGraph.js
      │  │  │  └─ portfolioTable.js
      │  │  └─ suggestion
      │  │     ├─ SuggestionAdd.js
      │  │     ├─ SuggestionCard.js
      │  │     └─ SuggestionList.js
      │  ├─ system_admin
      │  │  ├─ AdminCard.js
      │  │  ├─ AdminCardSub.js
      │  │  ├─ Header.js
      │  │  ├─ Main.js
      │  │  └─ VipRegister.js
      │  └─ user
      │     ├─ ConsultCard.js
      │     ├─ ConsultDetail.js
      │     ├─ ConsultEndCard.js
      │     └─ Main.js
      ├─ config
      │  └─ signaling-server.js
      ├─ contexts
      │  ├─ LoginContextProvider.js
      │  └─ WebRTCContext.js
      ├─ index.js
      └─ pages
         ├─ BankerPage.js
         ├─ ProfilePage.js
         ├─ RootPage.js
         ├─ consult
         │  ├─ AuthPage.js
         │  ├─ ConsentPage.js
         │  ├─ IdVerificationPage.js
         │  ├─ RebalancingPage.js
         │  └─ Sign.js
         ├─ etc
         │  ├─ FormPage.js
         │  ├─ MainPage.js
         │  ├─ VideoPage.js
         │  └─ useScript.js
         ├─ pb
         │  ├─ ConsultEndingPage.js
         │  ├─ FundAddPage.js
         │  ├─ FundPage.js
         │  ├─ LoginPage.js
         │  ├─ MainPage.js
         │  ├─ PortfolioPage.js
         │  ├─ SuggestionAddPage.js
         │  └─ SuggestionPage.js
         ├─ system_admin
         │  ├─ AdminPage.js
         │  └─ AdminPrivateRoute.js
         ├─ user
         │  ├─ ConsultDetailPage.js
         │  ├─ ConsultEndingPage.js
         │  ├─ LoginPage.js
         │  └─ MainPage.js
         └─ video
            ├─ PrivateRoute.js
            ├─ ProgressBarPage.js
            ├─ SharingPage.js
            ├─ VideoPage.js
            └─ WebRTC.js
```

## 🌼 역할 분담

## 🎃 페이지 별 기능

## 🐸 개선 및 추후 발전 계획
