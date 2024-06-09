function VipRegsiter() {
  return (
    <>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Select VIP RiskType</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">STABLE</h6>
                <small className="text-body-secondary">안정형</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">CONSERVATIVE</h6>
                <small className="text-body-secondary">안정추구형</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">NEUTRAL</h6>
                <small className="text-body-secondary">위험중립형</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
              <div className="text-success">
                <h6 className="my-0">GROWTH</h6>
                <small>성장추구형</small>
              </div>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">AGGRESSIVE</h6>
                <small className="text-body-secondary">성장형</small>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">VIP Information</h4>
          <form className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label" htmlFor="firstName">
                  이름
                </label>
                <input
                  className="form-control"
                  defaultValue=""
                  id="name"
                  placeholder=""
                  required
                  type="text"
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-6">
                <label className="form-label" htmlFor="lastName">
                  비밀번호(암호화 완료된)
                </label>
                <input
                  className="form-control"
                  defaultValue=""
                  id="password"
                  placeholder=""
                  required
                  type="text"
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
              <div className="col-6">
                <label for="country" className="form-label">
                  담당 PB
                </label>
                <select className="form-select" id="country" required>
                  <option value="">PB 선택</option>
                  <option>김가원</option>
                  <option>김주혜</option>
                  <option>김하영</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-6">
                <label className="form-label">성별</label>
                <div className="d-flex">
                  <div className="form-check mr-2">
                    <input
                      className="form-check-input"
                      id="same-address"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="same-address">
                      남자
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      id="same-address"
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="same-address">
                      여자
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="username">
                  E-mail
                </label>
                <div className="input-group has-validation">
                  <input
                    className="form-control"
                    id="email"
                    placeholder="email"
                    type="email"
                  />
                  <span className="input-group-text">@</span>
                  <input
                    className="form-control"
                    id="username"
                    placeholder="domain.com"
                    required
                    type="text"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="address">
                  주소
                </label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="서울특별시 성동구 성수동.."
                  required
                  type="text"
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="address2">
                  연락처
                </label>
                <input
                  className="form-control"
                  id="address2"
                  placeholder="ex) 010 - 1234 - 5678"
                  type="text"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="form-check">
              <input
                className="form-check-input"
                id="same-address"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="same-address">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                id="save-info"
                type="checkbox"
              />
              <label className="form-check-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>
            <hr className="my-4" />
            <div className="d-flex">
              <div className="w-25"></div>
              <button className="w-50 btn btn-success btn-lg" type="submit">
                VIP 등록하기
              </button>
              <div className="w-25"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VipRegsiter;
