import "./orderplace.css";
import React, { useEffect } from "react";
import MetaData from "../components/layout/MetaData";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import Loader from "../components/layout/Loader/Loader";
import { Link } from "react-router-dom";

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
            <Link to="/orders">
              <button id="order-btn" className="btn btn-outline-dark">
                Orders
              </button>
            </Link>
            <Link to="/dashboard">
              <button id="order-btn" className="btn btn-outline-dark">
                Dashboard
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default OrderPlaced;
