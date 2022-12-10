import axios from 'axios';
import { ACCEPT_OR_REJECT_ORDER_FAIL, ACCEPT_OR_REJECT_ORDER_REQUEST, ACCEPT_OR_REJECT_ORDER_SUCCESS, GET_AN_ORDER_DETAILS_FAIL, GET_AN_ORDER_DETAILS_REQUEST, GET_AN_ORDER_DETAILS_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PLACE_SERVICE_ORDER_FAIL, PLACE_SERVICE_ORDER_REQUEST, PLACE_SERVICE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants';
const url = process.env.REACT_APP_BACKEND_URL;

export const placeOrder = (data) => async (dispatch) => {
    try {
        dispatch({ type: PLACE_SERVICE_ORDER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
      
        const { data: result } = await axios.post(`${url}/api/v1/order/new`, { professional: data.professional, service: data.service, paymentMode: data.paymentMode }, config);
        dispatch({ type: PLACE_SERVICE_ORDER_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: PLACE_SERVICE_ORDER_FAIL, payload: error.response.result.message });
    }
} 

export const updateOrderStatus = (data, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };
      
        const { data: result } = await axios.put(`${url}/api/v1/order/status/${id}`, { status: data.status, value: data.value, description: data.description }, config);
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.result.message });
    }
}

export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST });
        const { data: result } = await axios.get(`${url}/api/v1/order/myorders`);
        dispatch({ type: GET_ORDER_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: GET_ORDER_FAIL, payload: error.response.result.message });
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_AN_ORDER_DETAILS_REQUEST });
        const { data: result } = await axios.get(`${url}/api/v1/order/details/${id}`);
        dispatch({ type: GET_AN_ORDER_DETAILS_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: GET_AN_ORDER_DETAILS_FAIL, payload: error.response.result.message });
    }
}

export const acceptOrder = (data, id) => async (dispatch) => {
    try {
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data: result } = await axios.put(`${url}/api/v1/order/accept/${id}`, data, config);
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_FAIL, payload: error.response.result.message });
    }
}

export const rejectOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_REQUEST });
        const { data: result } = await axios.delete(`${url}/api/v1/order/status/${id}`);
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_SUCCESS, payload: result });
    } catch (error) {
        dispatch({ type: ACCEPT_OR_REJECT_ORDER_FAIL, payload: error.response.result.message });
    }
}