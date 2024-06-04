function ProfileCard({ consult }) {
  const startedAt = consult.startedAt;
  const LocalDateTime2String = `${startedAt[0]}-${startedAt[1]
    .toString()
    .padStart(2, '0')}-${startedAt[2].toString().padStart(2, '0')}`;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title" style={{ padding: '20px 0 5px 0' }}>
          {LocalDateTime2String}
        </h5>
        <div className="card-content">{consult.content}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
