import React, { useEffect } from "react";
import Header from "../components/header";
import "./viewprofile.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import MetaData from "../components/layout/MetaData";
import Loader from "../components/layout/Loader/Loader";

function ViewProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, professional: user } = useSelector((state) => state.getAProfessional);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData
            title={user ? `${user.name}'s Profile` : "Professional Profile"}
          />
          {loading ? (
            <Loader />
          ) : (
            <>
              <Header />
              <div className="container">
                <div className="row align-items-center flex-row-reverse">
                  <div className="col-lg-6">
                    <div className="about-text go-to">
                      <h3 className="dark-color">About </h3>
                      <h6 className="theme-color lead">{user.name}</h6>
                      <p>{user.professional.about}.</p>
                      <div className="row about-list">
                        <div className="col-md-6">
                          <div className="media">
                            <label>Joined At</label>
                            <p>{String(user.createdAt).substr(0, 10)}</p>
                          </div>

                          <div className="media">
                            <label>City/Village</label>
                            <p>{user.address.city}</p>
                          </div>
                          <div className="media">
                            <label>Address</label>
                            <p>
                              {user.address.district},{user.address.state},
                              {user.address.pincode}
                            </p>
                          </div>
                          <div className="media">
                            <label>Experience</label>
                            <p>{user.professional.experience} Years</p>
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
                          <div className="media">
                            <label>Domain</label>
                            <p>{user.professional.specialization}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="about-avatar">
                      <img alt="..." src={user.avatar.url} />
                    </div>
                  </div>
                </div>
                <div className="counter">
                  <div className="row">
                  
                    <div className="col-6 col-lg-3">
                      <div className="count-data text-center">
                        <h6 className="count h2" data-to="150" data-speed="150">
                          150
                        </h6>
                        <p className="m-0px font-w-600">Order Completed</p>
                      </div>
                    </div>
                    <div className="col-6 col-lg-3">
                      <div className="count-data text-center">
                        <h6 className="count h2" data-to="850" data-speed="850">
                          5
                        </h6>
                        <p className="m-0px font-w-600">Rating</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ViewProfile;
