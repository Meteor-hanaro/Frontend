import React from "react";
import useScript from "../etc/useScript";
import { useParams } from 'react-router-dom';
function AuthPage() {
  const { params } = useParams();
  const queryParams = new URLSearchParams(params);
  const vipId = queryParams.get('vipId');
  useScript("https://code.jquery.com/jquery-1.12.4.min.js");
  useScript("https://cdn.iamport.kr/js/iamport.payment-1.2.0.js");
  const certify = () => {
    const { IMP } = window;
    IMP.init("imp74352341");
    IMP.certification(
      {
        // param
        // pg: "inicis_unified.{CPID}", //본인인증 설정이 2개이상 되어 있는 경우 필수
        merchant_uid: vipId,
        popup: true,
      },
      (rsp) => {
        if (rsp.success) {
          alert("인증되었습니다.");
          console.log(rsp);
        } else {
          alert(`인증에 실패했습니다. 에러: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div className="AuthPage justify-content-center">
      <div id="auth-box" className="d-flex align-items-center">
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KB.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_NAVER.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KAKAOBANK.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KAKAO.png?v=20240122" /></div>
        </div>
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_PASS.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_HANA.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_SAMSUNG.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_SHINHAN.png?v=20240122" /></div>
        </div>
        <div id="icons-box">   
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_TOSS.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_PAYCO.png?v=20240122" /></div>
          <div><img id="autn-img" src="https://kssa.inicis.com/resources/images/app_KFTC.png?v=20240122" /></div>
        </div>
        <div id="middle-box">
          <button className="btn btn-auth" onClick={certify}>간편인증</button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
