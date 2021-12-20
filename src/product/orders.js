import React, { useEffect } from "react";
import Header from "../components/header";
import "./order.css";
import MetaData from "../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import { getMyOrders, getOrderDetails } from "../actions/orderActions";
import Loader from "../components/layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

function Orders() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, orders } = useSelector((state) => state.getOrders);

  const handleTrackOrder = (id) => {
    dispatch(getOrderDetails(id));
    navigate(`/orderdetails/${id}`);
  }

  useEffect(() => {
    dispatch(getMyOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`All Orders`} />
          <Header />
          <div className="order-cont">
            {orders && orders.length>0?
              orders.map((order) => (
                <div
                  className="alert alert-success"
                  role="alert"
                  key={order._id}
                >
                  <h5 className="alert-heading">
                    <span id="left-krdo">Order Id:{order._id}</span>{" "}
                    <span id="right-krdo">
                      {order.placedAt.toString().substr(0, 10)}
                    </span>
                  </h5>
                  <br />
                  <p id="margintop-dedo">
                    <span id="left-krdo">{order.service.name}</span>
                    <span id="right-krdo">
                      Total Price: &#8377; {order.totalCost}
                    </span>
                  </p>
                  <br />
                  
                  <p id="margintop-dedo">
                    <span id="left-krdo">Professional: {order.professional.name}</span>
                    <span id="right-krdo">Order Status: {order.status}</span>
                  </p>
                  <br />
                  <p id="margintop-dedo"> 
                    <span id="left-krdo">{`${order.professional.address.city}, ${order.professional.address.district}, ${order.professional.address.state}`}</span>
                    <span id="right-krdo">Mobile No: {order.professional.phoneno}</span>
                  </p>
                  <br/>
                  <hr />
                  <p className="mb-0">
                      <button id="order-btn" className="btn btn-light" onClick={() => handleTrackOrder(order._id)}>
                        Track Order
                      </button>
                  </p>
                </div>
              )):<h3 id="center-it">You have no orders!</h3>}
          </div>
        </>
      )}
    </>
  );
}

export default Orders;
