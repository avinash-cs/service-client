import React, { useEffect } from "react";
import "./orderdetail.css";
import Header from "../components/header";
import MetaData from "../components/layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "../actions/userActions";
import Loader from "../components/layout/Loader/Loader";

function Orderdetails() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    error,
    loading,
    order: Order,
  } = useSelector((state) => state.getAnOrder);

  useEffect(() => {
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
          <MetaData title={"Detailed Order"} />
          <Header />
          <div id="margin-dedo">
            <div className="card">
              <div className="title">Service Reciept</div>
              <div className="info">
                <div className="row">
                  <div className="col-7">
                    {" "}
                    <span id="heading">Date</span>
                    <br />{" "}
                    <span id="details">
                      {Order.placedAt.toString().substr(0, 10)}
                    </span>{" "}
                  </div>
                  <div className="col-5 pull-right">
                    {" "}
                    <span id="heading">Order Id</span>
                    <br /> <span id="details">{Order._id}</span>{" "}
                  </div>
                </div>
              </div>
              <div className="pricing">
                <div className="row">
                  <div className="col-9">
                    {" "}
                    <span id="name">{Order.service.name}</span>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <span id="price">&#8377;{Order.service.price}</span>{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    {" "}
                    <span id="name">Additional Cost : </span>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <span id="price">&#8377;{Order.addCost ? Order.addCost.value : 0}</span>{" "}
                  </div>
                  <div className="col-9">
                    <span id="name">Description : </span>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <span id="price">{Order.addCost ? Order.addCost.description : "N/A"}</span>{" "}
                    {/* <span id="name">Additional Cost : { Order.addCost.description?Order.addCost.description:" "  }</span>{" "} */}
                  </div>
                  <div className="col-3">
                    {" "}
                    {/* <span id="price">&#8377;{Order.addCost.value?Order.addCost.value:" "}</span>{" "} */}
                  </div>
                </div>
              </div>
              <div className="total">
                <div className="row">
                  <div className="col-9">Total cost:</div>
                  <div className="col-3">
                    <big>&#8377;{Order.totalCost}</big>
                  </div>
                </div>
              </div>
              <div className="tracking">
                <div className="title">Tracking Order</div>
              </div>
              <div className="progress-track">
              { Order.status === "Processing" &&
                <ul id="progressbar">
                  <li className="step0 active " id="step1">
                    Processing
                  </li>
                  <li className="step0  text-center" id="step2">
                    Order Placed
                  </li>
                  <li className="step0  text-right" id="step3">
                    On the way
                  </li>
                  <li className="step0 text-right" id="step4">
                    Completed
                  </li>
                </ul>
              }
              { Order.status === "Order Placed" &&
                <ul id="progressbar">
                  <li className="step0 active " id="step1">
                    Processing
                  </li>
                  <li className="step0  active text-center" id="step2">
                    Order Placed
                  </li>
                  <li className="step0  text-right" id="step3">
                    On the way
                  </li>
                  <li className="step0 text-right" id="step4">
                    Completed
                  </li>
                </ul>
              }
              { Order.status === "On the Way" &&
                <ul id="progressbar">
                  <li className="step0 active " id="step1">
                    Processing
                  </li>
                  <li className="step0  active text-center" id="step2">
                    Order Placed
                  </li>
                  <li className="step0 active text-right" id="step3">
                    On the way
                  </li>
                  <li className="step0 text-right" id="step4">
                    Completed
                  </li>
                </ul>
              }
                { Order.status === "Completed" &&
                <ul id="progressbar">
                  <li className="step0 active " id="step1">
                    Processing
                  </li>
                  <li className="step0  active text-center" id="step2">
                    Order Placed
                  </li>
                  <li className="step0  active text-right" id="step3">
                    On the way
                  </li>
                  <li className="step0 active text-right" id="step4">
                    Completed
                  </li>
                </ul>
              }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Orderdetails;
