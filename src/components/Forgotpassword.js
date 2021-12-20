import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Header from "../components/header";
import MetaData from "./layout/MetaData";
import Loader from './layout/Loader/Loader';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, forgotPassword } from "../actions/userActions";

function Forgotpass() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MetaData title="Forgot Password" />
          <div className="reg-body">
            <div className="container-pass">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="register-form toggle">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    id="register-ml"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                  />
                  <div className="register-row"></div>
                  <button type="submit">Submit</button>
                  <p>
                    Do you have an account?{" "}
                    <a href="/login" className="switch">
                      Login Now
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Forgotpass;
