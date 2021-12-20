import React, { useEffect } from "react";
import "./detailed.css";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getAllServices } from "../actions/serviceActions";
import { useParams } from "react-router-dom";
import Loader from "../components/layout/Loader/Loader";
import { addServiceToCart } from "../actions/cartActions";

function Detailedservice() {
  const alert = useAlert();
  const disptach = useDispatch();
  const { name } = useParams();

  const { error, loading, services } = useSelector((state) => state.newService);

  useEffect(() => {
    disptach(getAllServices(name));
    if (error) {
      alert.error(error);
      disptach(clearErrors());
    }
  }, [error, alert, disptach, name]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="service-main">
            <div className="service-menu">
              <div className="service-name">
                <h2> Service </h2>
              </div>
              <hr />
              <div className="service-product">
                {services &&
                  services.map((service, idx) => (
                    <div className="card" id="product-card" key={idx}>
                      <img
                        src={service.serviceImage.url}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          <span id="text-left">{service.name}</span>
                          <span id="text-right">
                            &#8377;{service.price}
                          </span>
                        </h5>
                        <p className="card-text">{service.description}</p>
                      </div>
                      <div className="card-body">
                          <button type="button" className="btn btn-primary" onClick={() => {disptach(addServiceToCart(`${service._id}`)); alert.success('Service added to cart successfully')}}>
                            Add to Cart
                          </button>
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

export default Detailedservice;
