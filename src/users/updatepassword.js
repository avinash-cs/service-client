import React, { useEffect, useState } from "react";
import "./updatepassword.css";
import Header from "../components/header";
import MetaData from "../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import Loader from "../components/layout/Loader/Loader";
import { clearErrors, updatePassword } from "../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.updateProfile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Password updated successfully');
      navigate('/profile');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [error, alert, dispatch, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Password" />
          <Header />
          <div className="reg-body">
            <div className="container-setup">
              <div className="logo">
                <h3>Service Fare</h3>
              </div>
              <div className="setup">
                <h2 className="setup-head2">Update Password</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="password"
                      value={oldPassword}
                      name="oldPassword"
                      required
                      placeholder="Enter Old Password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={newPassword}
                      name="newPassword"
                      required
                      placeholder="Enter New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      value={confirmPassword}
                      name="confirmPassword"
                      required
                      placeholder="Confirm New Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="btn-container">
                    <button type="submit" style={{ marginRight: "3px" }}>
                      Submit
                    </button>
                    <button
                      type="submit"
                      style={{ marginLeft: "3px" }}
                      //   onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword;
