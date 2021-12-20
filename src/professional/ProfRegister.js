import React, { useEffect, useState } from "react";
import "./ProfRegister.css";
import Header from "../components/header";
import Profile from "../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, registerUser } from "../actions/userActions";
import { useNavigate } from "react-router";
import Loader from "../components/layout/Loader/Loader";

function Register() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const imgDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    myForm.append("role", "professional");

    dispatch(registerUser(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/setupprofile");
    }
  }, [error, dispatch, navigate, alert, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="reg-body">
            <div className="container-pro-reg">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="register-form toggle">
                <h2>Professional Registration</h2>
                <form className="proRegForm" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    id="reg-fname"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                  />
                  <input
                    type="email"
                    name="email"
                    id="register-ml"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <input
                    type="password"
                    name="password"
                    id="register-pd"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <div id="registerImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={imgDataChange}
                    />
                  </div>
                  <div className="register-row"></div>
                  <button type="submit" className="reg-btn">
                    Register
                  </button>
                  <p className="account">
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

export default Register;
