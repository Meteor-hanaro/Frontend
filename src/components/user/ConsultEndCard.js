function ConsultRegister() {
  return (
    <main
      id='main'
      className='main'
      style={{
        padding: '45px',
        marginLeft: '5%',
        marginRight: '5%',
        height: `calc(100vh - 60px)`,
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className='select-box'
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
        onClick={() => window.close()}
      >
        <div className='select-box-wrapper'>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/meteor.png`}
              style={{ marginBottom: '30px', height: '250px' }}
            />
          </div>
          <div className='summary' style={{ marginBottom: '15px' }}>
            감사합니다, 고객님
          </div>
          <div class='description'>
            <br />
            소중한 시간을 내어주셔서 감사합니다.
            <br />더 나은 서비스를 제공하기 위해 항상 노력하겠습니다.
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConsultRegister;
