function ProfileCard() {
  return (
    <div className="card">
      <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
        <img
          src={process.env.PUBLIC_URL + '/assets/img/profile-img.jpg'}
          alt="Profile"
          className="rounded-circle"
        />
        <h2>Kevin Anderson</h2>
        <h3>Web Designer</h3>
        <div className="social-links mt-2">
          <a href="#" className="twitter">
            <i className="bi bi-twitter" />
          </a>
          <a href="#" className="facebook">
            <i className="bi bi-facebook" />
          </a>
          <a href="#" className="instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href="#" className="linkedin">
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
