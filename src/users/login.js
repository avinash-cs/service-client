import React, { useEffect, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import "./login.css";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, loadUser, loginUser } from "../actions/userActions";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader/Loader";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user.email, user.password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(loadUser());
      navigate('/');
    }
  }, [error, alert, navigate, dispatch, isAuthenticated]);

  return (
    <>
      <MetaData title="Login" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="reg-body">
            <div className="container-login">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="row">
                <div className="login-form">
                  <h2>Login</h2>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={user.email}
                      name="email"
                      id="login-ml"
                      required
                      placeholder="Enter your Email"
                      onChange={handleUser}
                    />
                    <input
                      type="password"
                      vlue={user.password}
                      name="password"
                      id="login-pd"
                      required
                      placeholder="Enter your password"
                      onChange={handleUser}
                    />

                    <div className="login-row">
                      
                      <Link to="/forgotpassword">Forgot password</Link>
                    </div>
                    <button type="submit">Login</button>
                    <p>
                      Don't have an account?{" "}
                      <Link to="/signup" className="switch">
                        Register Now
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Login;
