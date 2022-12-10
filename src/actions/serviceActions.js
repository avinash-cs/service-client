import axios from "axios";
import {
  NEW_SERVICE_FAIL,
  NEW_SERVICE_REQUEST,
  NEW_SERVICE_SUCCESS,
  CLEAR_ERRORS,
  NEW_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAIL,
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  GET_A_SERVICE_DETAIL_REQUEST,
  GET_A_SERVICE_DETAIL_SUCCESS,
  GET_A_SERVICE_DETAIL_FAIL,
} from "../constants/serviceConstants";

var url = "https://servicefarebackend.onrender.com";

// Create service
export const createService = (serviceData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SERVICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/service/new`,
      serviceData,
      config
    );
    dispatch({
      type: NEW_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NEW_SERVICE_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Create category
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/service/category`,
      categoryData,
      config
    );
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Get all category
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORIES_REQUEST });

    const { data } = await axios.get(`/api/v1/service/category`);
    dispatch({
      type: GET_ALL_CATEGORIES_SUCCESS,
      payload: data.categories,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_CATEGORIES_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Get all services of a category
export const getAllServices = (name) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SERVICES_REQUEST });
    
    const { data } = await axios.get(`/api/v1/service/${name}`);
    dispatch({
      type: GET_ALL_SERVICES_SUCCESS,
      payload: data.services,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_SERVICES_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Get a services details
export const getServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_A_SERVICE_DETAIL_REQUEST });
    
    const { data } = await axios.get(`/api/v1/service/details/${id}`);
    dispatch({
      type: GET_A_SERVICE_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_A_SERVICE_DETAIL_FAIL,
      payload: err.response.data.message,
    });
  }
};

// Clearing all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
