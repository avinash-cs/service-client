import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, submitReview } from "../actions/userActions";
import Header from "../components/header";
import Loader from "../components/layout/Loader/Loader";
import MetaData from "../components/layout/MetaData";
import { SUBMIT_REVIEW_RESET } from "../constants/userConstants";

function Review() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);

    dispatch(submitReview(id, myForm));
  }

  const { error, loading, success } = useSelector(
    (state) => state.submitReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review sent successfully!");
      dispatch({ type: SUBMIT_REVIEW_RESET });
      navigate('/cart');
    }
  }, [alert, error, dispatch, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Review"} />
          <Header />
          <div>
            <div className="reg-body">
              <div className="container-pro-reg">
                <div className="register-form toggle">
                  <h2>Review Professional Service</h2>
                  <form className="proRegForm" onSubmit={handleSubmit}>
                    <div>
                      <select className="selectStyle" id="domain" name="rating" required value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value="select" selected="selected">
                          Rate professional work out of 5
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      id="register-ml"
                      placeholder="Share your experience"
                    />

                    <div className="register-row"></div>
                    <button type="submit" className="reg-btn">
                      Submit
                    </button>
                    <button className="reg-btn" onClick={() => navigate('/cart')}>
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Review;
