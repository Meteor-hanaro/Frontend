function Login() {
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="pt-4 pb-2">
                <div className="d-flex flex-column align-items-center">
                  <h5 className="card-title text-center pb-0 fs-4">
                    우리는 더 나은 내일을 만듭니다.
                  </h5>
                  <p className="text-center small">
                    We create a better tomorrow.
                  </p>
                </div>
              </div>
              {/* End Logo */}
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <div className="d-flex flex-column align-items-center">
                      <div className="logo d-flex align-items-center w-auto">
                        <div className="card-title text-center pb-0 fs-4">
                          <span>Gold Lounge</span>
                        </div>
                      </div>
                      <p className="text-center small">
                        Enter your ID &amp; PW to login
                      </p>
                    </div>
                  </div>
                  <form className="row g-3 needs-validation" noValidate="">
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">
                        ID
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          id="yourUsername"
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please enter your username.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">
                        PW
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="yourPassword"
                        required=""
                      />
                      <div className="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
