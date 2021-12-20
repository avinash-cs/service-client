import {
  ADD_SERVICE_TO_CART_FAIL,
  ADD_SERVICE_TO_CART_REQUEST,
  ADD_SERVICE_TO_CART_SUCCESS,
  GET_SERVICES_IN_CART_REQUEST,
  GET_SERVICES_IN_CART_SUCCESS,
  GET_SERVICES_IN_CART_FAIL,
  CLEAR_ERRORS,
  DELETE_SERVICES_IN_CART_REQUEST,
  DELETE_SERVICES_IN_CART_SUCCESS,
  DELETE_SERVICES_IN_CART_FAIL
} from "../constants/cartConstants";

export const addServiceToCartReducer = (state = { cart: {} }, action) => {
  switch (action.type) {
    case ADD_SERVICE_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_SERVICE_TO_CART_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        cart: action.payload.cartInfo,
      };
    case ADD_SERVICE_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getServicesReducer = (state = {services: []}, action) => {
  switch (action.type) {
    case GET_SERVICES_IN_CART_REQUEST:
    case DELETE_SERVICES_IN_CART_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_SERVICES_IN_CART_SUCCESS:
      return {
        loading: false,
        services: action.payload.result
      };
    case DELETE_SERVICES_IN_CART_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case GET_SERVICES_IN_CART_FAIL:
    case DELETE_SERVICES_IN_CART_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}