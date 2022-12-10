import { CLEAR_ERRORS, GET_ALL_PROFESSIONALS_FAIL, GET_ALL_PROFESSIONALS_REQUEST, GET_ALL_PROFESSIONALS_SUCCESS, GET_A_PROFESSIONAL_FAIL, GET_A_PROFESSIONAL_REQUEST, GET_A_PROFESSIONAL_SUCCESS } from "../constants/profConstants";

// get all profs by category
export const getAllProfsOfACategoryReducer = (state = {profs: []}, action) => {
    switch (action.type) {
        case GET_ALL_PROFESSIONALS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_PROFESSIONALS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                profs: action.payload.professionals
            };
        case GET_ALL_PROFESSIONALS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export const getAProfessionalReducer = (state = {professional: {}}, action) => {
    switch (action.type) {
        case GET_A_PROFESSIONAL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_A_PROFESSIONAL_SUCCESS:
            return {
                loading: false,
                professional: action.payload
            };
        case GET_A_PROFESSIONAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}