import { useNavigate } from 'react-router-dom';
function ProfileCard({ consult, pb }) {
  const navigate = useNavigate();
  const startedAt = consult.startedAt;
  const LocalDateTime2String = `${startedAt[0]}-${startedAt[1]
    .toString()
    .padStart(2, '0')}-${startedAt[2].toString().padStart(2, '0')}`;

  const moveToConsultDetail = (data) => {
    console.log(data.id);
    navigate(`/vip/consult/${data.id}`, { state: { consult: data, pb: pb } });
  };

  return (
    <div className='card' onClick={() => moveToConsultDetail(consult)}>
      <div className='card-body'>
        <h5 className='card-title' style={{ padding: '20px 0 5px 0' }}>
          {LocalDateTime2String}
        </h5>
        <div
          className='card-content'
          dangerouslySetInnerHTML={{ __html: consult.content }}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
