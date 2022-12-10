import axios from "axios";
import {
  ADD_SERVICE_TO_CART_FAIL,
  ADD_SERVICE_TO_CART_REQUEST,
  ADD_SERVICE_TO_CART_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SERVICES_IN_CART_FAIL,
  DELETE_SERVICES_IN_CART_REQUEST,
  DELETE_SERVICES_IN_CART_SUCCESS,
  GET_SERVICES_IN_CART_FAIL,
  GET_SERVICES_IN_CART_REQUEST,
  GET_SERVICES_IN_CART_SUCCESS
} from "../constants/cartConstants";
import {
  ACCEPT_OR_REJECT_ORDER_FAIL,
  ACCEPT_OR_REJECT_ORDER_REQUEST, ACCEPT_OR_REJECT_ORDER_SUCCESS
} from "../constants/orderConstants";

// var url = "https://servicefarebackend.onrender.com";
// add service to cart
export const addServiceToCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SERVICE_TO_CART_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/cart/addService/${id}`, config);
    dispatch({ type: ADD_SERVICE_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all services from cart
export const getServicesFromCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SERVICES_IN_CART_REQUEST });
    const { data } = await axios.get(`/api/v1/cart/getServicesInCart`);
    dispatch({ type: GET_SERVICES_IN_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SERVICES_IN_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete a service from cart
export const deleteServicesFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SERVICES_IN_CART_REQUEST });
    const { data } = await axios.delete(`/api/v1/cart/addService/${id}`);
    dispatch({ type: DELETE_SERVICES_IN_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_SERVICES_IN_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cancelOrder = (id) => async (dispatch) => {
  try {
      dispatch({ type: ACCEPT_OR_REJECT_ORDER_REQUEST });
      const { data: result } = await axios.put(`/api/v1/cart/cancel/${id}`);
      dispatch({ type: ACCEPT_OR_REJECT_ORDER_SUCCESS, payload: result });
  } catch (error) {
      dispatch({ type: ACCEPT_OR_REJECT_ORDER_FAIL, payload: error.response.result.message });
  }
}

// Clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
