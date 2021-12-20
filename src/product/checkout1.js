import "./checkout1.css";
import React, { useEffect } from "react";
import Header from "../components/header";
import MetaData from "../components/layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import Loader from "../components/layout/Loader/Loader";
import { getAllProfsByCategory, getAProf } from "../actions/profActions";
import { useLocation } from "react-router-dom";
import { getServiceDetails } from "../actions/serviceActions";

function Checout1() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, profs, loading } = useSelector(
    (state) => state.getProfsByCategory
  );

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const category = query.get("category");
  const serviceId = query.get("serviceId");
  const handlerViewProfile = (id) => {
    dispatch(getAProf(id));
    navigate(`/viewprofile/${id}`);
  };
  const handlerSelectMe = (profId) => {
    dispatch(getServiceDetails(serviceId));
    navigate(`/confirmorder?serviceId=${serviceId}&profId=${profId}`)
  }
  useEffect(() => {
    dispatch(getAllProfsByCategory(category));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch, category]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            <MetaData title="Select Professional " />
            <div>
              <br />
              <h6 id="center-it">
                Select a Professional for your service,
                <br />
                by clicking on <span id="select-me">Select Me </span>Button
              </h6>
              <div className="service-product">
                {profs &&
                  profs.map((prof, idx) => (
                    <div className="card" id="product-card" key={idx}>
                      <img
                        src={prof.avatar.url}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          <span id="text-left">{prof.name}</span>
                          <span id="text-right">
                            {prof.rating}{" "}
                            <img
                              id="star-img"
                              alt="star"
                              src="https://img.icons8.com/fluency/48/000000/star.png"
                            />
                          </span>
                        </h5>
                        <p className="card-text">
                          {prof.professional.specialization}
                          <br />{" "}
                          {`${prof.address.city}, ${prof.address.district}, ${prof.address.state}`}
                        </p>
                      </div>
                      <div className="card-body">
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() => handlerViewProfile(`${prof._id}`)}
                          >
                            View Profile
                          </button>
                        </div>
                        <br />
                        <div>
                          <button className="btn btn-primary" onClick={() => handlerSelectMe(prof._id)}>Select Me</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Checout1;
