import React, { useEffect } from "react";
import "./profile.css";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import { clearErrors } from "../actions/userActions";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader/Loader";
import { Link } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, user, loading } = useSelector((state) => state.user);

  const address = user.address;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(user.role==="professional"){
      navigate("/professionalprofile")
    }
    if (!address) {
      navigate("/setupprofile");
    }
  }, [error, navigate, dispatch, alert, address, user]);

  return (
    
        <>
          <MetaData title={user ? `${user.name}'s Profile` : "Profile"} />
          {loading ? (
            <Loader />
          ) : (
            <>
              <Header />
              <div id="profile-all">
                <div className="container">
                  <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                      <div className="about-text go-to">
                        <h3 className="dark-color">About </h3>
                        <h6 className="theme-color lead">{user.name}</h6>

                        <div className="row about-list">
                          <div className="col-md-6">
                            <div className="media">
                              <label>Joining Date</label>
                              <p>{String(user.createdAt).substring(0, 10)}</p>
                            </div>

                            <div className="media">
                              <label>City/Village</label>
                              <p>{address.city}</p>
                            </div>
                            <div className="media">
                              <label>Address</label>
                              <p>
                                {address.district},{address.state},
                                {address.pincode}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="media">
                              <label>E-mail</label>
                              <p>{user.email}</p>
                            </div>
                            <div className="media">
                              <label>Phone</label>
                              <p>{user.phoneno}</p>
                            </div>
                            <div className="media">
                              <label>Gender</label>
                              <p>{user.gender}</p>
                            </div>
                          </div>
                          
                           
                          
                          
                  <div className="btn-sub-can">
                  <Link id="edit-a" to="/editprofile">
                    <button type="submit" id="profile-btn" >
                    Edit Profile
                    </button>
                  </Link>
                  <br />
                  <Link id="edit-a" to="/updatepassword">
                    <button
                      type="submit"
                      id="profile-btn"
                      
                    
                    >
                      Update Password
                    </button>
                    </Link>
                    </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="about-avatar">
                        <img src={user.avatar.url} alt="Profile" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      
  );
}

export default Profile;
