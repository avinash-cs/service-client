import axios from "axios";
import { GET_ALL_PROFESSIONALS_FAIL, GET_ALL_PROFESSIONALS_REQUEST, GET_ALL_PROFESSIONALS_SUCCESS, GET_A_PROFESSIONAL_FAIL, GET_A_PROFESSIONAL_REQUEST, GET_A_PROFESSIONAL_SUCCESS } from "../constants/profConstants";

export const getAllProfsByCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PROFESSIONALS_REQUEST });
        
        const { data } = await axios.get(`/api/v1/user/professional/${category}`);
        dispatch({ type: GET_ALL_PROFESSIONALS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_PROFESSIONALS_FAIL });
    }
}

export const getAProf = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_A_PROFESSIONAL_REQUEST });
        const { data } = await axios.get(`/api/v1/user/professional/single/${id}`);
        dispatch({ type: GET_A_PROFESSIONAL_SUCCESS, payload: data.professional });
    } catch (error) {
        dispatch({ type: GET_A_PROFESSIONAL_FAIL });
    }
}