import React, { useEffect } from "react";
import "./cart.css";
import Header from "../components/header";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  cancelOrder,
  clearErrors,
  getServicesFromCart,
  deleteServicesFromCart
} from "../actions/cartActions";
import Loader from "../components/layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, services, success } = useSelector(
    (state) => state.servicesInCart
  );

  // let totalPrice = 0;

  // services &&
  //   services.forEach((service) => {
  //     totalPrice += service.price;
  //   });

  const handleCancelOrder = (id) => {
    dispatch(cancelOrder(id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getServicesFromCart());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Service removed successfully");
    }
  }, [error, alert, dispatch, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div>
            {services.length > 0 ? (
              <div className="for-cart">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Remove</th>
                      <th scope="col">Select</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services &&
                      services.map((service, idx) => (
                        <tr key={service.id}>
                          <th scope="row">
                            <img
                              alt="service-img"
                              className="cart-img"
                              src={service.image.url}
                            />
                          </th>
                          <td>{service.name}</td>
                          <td>
                          <button id="cart-btn" class="btn btn-outline-danger" disabled={service.isOrderAccepted !== undefined} onClick={() => {dispatch(deleteServicesFromCart(service.id)); window.location.reload()}}>
                            Remove
                          </button>
                        </td>
                          {service.isCompleted === false ? (
                            <td>
                              <Link
                                to={`/selectprofessional?category=${
                                  service.category
                                }&serviceId=${service.id.toString()}`}
                              >
                                <button
                                  id="order-btn"
                                  disabled={
                                    service.isOrderAccepted !== undefined
                                  }
                                >
                                  {service.isOrderAccepted === true
                                    ? "Accepted"
                                    : service.isOrderAccepted === false
                                    ? "Request sent"
                                    : "Select Professional"}
                                </button>
                              </Link>
                              <br />
                              {service.isOrderAccepted === false && (
                                <button
                                  className="btn btn-danger"
                                  id="order-btn"
                                  onClick={() =>
                                    handleCancelOrder(service.id.toString())
                                  }
                                >
                                  Cancel
                                </button>
                              )}
                            </td>
                          ) : (
                            <td>
                              <button
                                className="btn btn-danger"
                                id="order-btn"
                                disabled
                                style={{ backgroundColor: "green" }}
                              >
                                Completed
                              </button>
                              <button
                                className="btn btn-danger"
                                id="order-btn"
                                onClick={() =>
                                  navigate(`/review/${service.professional}`)
                                }
                                style={{ backgroundColor: "blue" }}
                              >
                                Submit Review
                              </button>
                              <button
                                className="btn btn-danger"
                                id="order-btn"
                                onClick={() => {dispatch(deleteServicesFromCart(service.id)); window.location.reload();}}
                              >
                                Archive
                              </button>
                            </td>
                          )}
                          <td>&#8377;{service.price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1 style={{ margin: "50px", textAlign: "center" }}>
                Cart is Empty!
              </h1>
            )}
            <br />
          </div>
        </>
      )}
    </>
  );
}
export default Cart;
