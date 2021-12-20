import "./orderplace.css";
import React, { useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import Loader from "../components/layout/Loader/Loader";

function OrderPlaced() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, order, success } = useSelector(
    (state) => state.newOrder
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Order placed successfully!");
    }
  }, [alert, error, dispatch, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <MetaData title="Order Placed" />
          <div className="order-cont">
            <h1>
              Congratulations! <br />
              Order placed successfully
            </h1>
            <h3>`Your Order id is "${order._id}"`</h3>
            <a href="/orders">
              <button id="order-btn" className="btn btn-outline-dark">
                Orders
              </button>
            </a>
            <a href="/dashboard">
              <button id="order-btn" className="btn btn-outline-dark">
                Dashboard
              </button>
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default OrderPlaced;
