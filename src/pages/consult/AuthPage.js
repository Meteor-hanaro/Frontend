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
    <div className="AuthPage">
      <div>
        <button onClick={certify}>간편인증</button>
      </div>
    </div>
  );
}

export default AuthPage;
