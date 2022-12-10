import React, { useEffect, useState } from "react";
import "./cofirmorder.css";
import MetaData from "../components/layout/MetaData";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/serviceActions";
import Loader from "../components/layout/Loader/Loader";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { placeOrder } from "../actions/orderActions";

function ConfirmOrder() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const [paymentMode, setPaymentMode] = useState('');

  const serviceId = query.get("serviceId");
  const profId = query.get("profId");

  const { error, service, loading } = useSelector((state) => state.newService);
  const { profs } = useSelector(state => state.getProfsByCategory);

  const prof = profs.find(prof => prof._id.toString() === profId);

  const handlerConfirmOrder = () => {
      const data = {
          professional: profId,
          service: serviceId,
          paymentMode
      }
      dispatch(placeOrder(data));
      navigate('/orderplaced');
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, serviceId, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Confirm Order"} />
          <Header />
          <div>
            <div>
              <h3 id="center-it">Confirm Your Details</h3>
            </div>
            <div className="service-product">
              <div className="card" id="product-card">
                <img className="card-img-top" src={service.serviceImage.url} alt={service.name} />
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                </div>

                <div className="card-body">
                  <p>{service.price}</p>
                </div>
              </div>
            </div>
            <br />
            <div>
              <div className="service-product">
                <div className="card" id="product-card">
                  <img className="card-img-top" src={prof.avatar.url} alt={prof.name} />
                  <div className="card-body">
                    <h5 className="card-title">{prof.name}</h5>
                  </div>

                  <div className="card-body">
                    <p>{`${prof.address.city}, ${prof.address.district}, ${prof.address.state}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <h3 id="center-it">Select Your Payment Mode</h3>

            <div id="center-it">
                <div id="select-payment">
                  <select id="payment" name="payment" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                    <option value="">Select Payment Method</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
                <div>
                    <button id="order-btn" class="btn btn-primary" onClick={handlerConfirmOrder}>
                      Confirm Order
                    </button>
                  <Link to="/">
                    <button id="order-btn" class="btn btn-primary" onClick={() => navigate('/cart')}>
                      {" "}
                      Cancel Order
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConfirmOrder;
