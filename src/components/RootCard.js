import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RootCard({ value }) {
  const [src, setSrc] = useState('assets/img/' + value + '.png');
  const [line1, setLine1] = useState('자산 관리자와의 비대면 상담으로');
  const [line2, setLine2] = useState('최고 수준의 투자 서비스를 경험하세요.');

  useEffect(() => {
    if (value == 'pb') {
      setLine1('최적의 투자 전략으로');
      setLine2('더 나은 미래를 위해 함께합니다.');
    }
  }, []);

  const navigate = useNavigate();
  const getLoginPage = (value) => {
    navigate('/' + value);
  };

  return (
    <div>
      <div className='select-box'>
        <div className='select-box-wrapper'>
          <div className='icon'>
            <img
              src={src}
              className='iconImg'
              onClick={() => getLoginPage(value)}
            />
          </div>
          <div className='summary'>{value.toUpperCase()}</div>
          <div class='description'>
            <br />
            {line1}
            <br />
            {line2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootCard;
