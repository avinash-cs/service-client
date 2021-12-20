import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateOrderStatus } from "../actions/orderActions";
import { clearErrors, loadUser } from "../actions/userActions";
import Header from "../components/header";
import Loader from "../components/layout/Loader/Loader";
import MetaData from "../components/layout/MetaData";
import "./updateorder.css";

function UpdateOrder() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, loading, success, order } = useSelector(
    (state) => state.newOrder
  );
  
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      status,
      description,
      value
    }

    dispatch(updateOrderStatus(data, id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Order updated successfully");
      dispatch(loadUser());
      navigate("/professionalorder");
    }
  }, [error, success, alert, dispatch, order, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Update Order"} />
          <Header />
          <div>
            <div id="margin-dedo">
              <div className="alert alert-success">
                <h2 className="setup-head2">Update Order</h2>
                <form onSubmit={handleSubmit}>
                  <div className="select-style">
                    <select id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Update Status</option>
                      <option value="Order Placed">Order Placed</option>
                      <option value="On the Way">On the Way</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      required={value > 0}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter Updated Price"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      required={value > 0}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description for price updation"
                    />
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      id="order-btn"
                      class="btn btn-light"
                    >
                      Submit
                    </button>
                    <button
                      type="submit"
                      id="order-btn"
                      class="btn btn-light"
                      onClick={() => navigate('/orders')}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateOrder;
