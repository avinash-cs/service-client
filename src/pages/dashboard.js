import React, { useEffect } from "react";
import "./dashboard.css";
import Header from "../components/header";
import Loader from "../components/layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getAllCategories } from "../actions/serviceActions";
import { Link } from "react-router-dom";

function Dashboard() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, categories } = useSelector(
    (state) => state.newCategory
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
  }, [alert, error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="dashboard-main">
            <h3 id="center-it" style={{"marginTop": "15px"}}>Select Category related to your Service</h3>
            <div className="service-cont">
              {categories &&
                categories.map((category, idx) => (
                  <div className="service" key={idx}>
                    <Link to={`/service/${category.name}`}>
                      <img
                        alt={category.name}
                        className="service-icon"
                        src={category.imageUrl}
                      />
                      <h4>{category.name}</h4>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
