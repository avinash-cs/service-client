const { GET_AN_ORDER_DETAILS_REQUEST, PLACE_SERVICE_ORDER_REQUEST, PLACE_SERVICE_ORDER_SUCCESS, PLACE_SERVICE_ORDER_FAIL, CLEAR_ERRORS, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL, GET_AN_ORDER_DETAILS_SUCCESS, GET_AN_ORDER_DETAILS_FAIL, ACCEPT_OR_REJECT_ORDER_REQUEST, ACCEPT_OR_REJECT_ORDER_SUCCESS, ACCEPT_OR_REJECT_ORDER_FAIL } = require("../constants/orderConstants");

export const placeOrderReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case PLACE_SERVICE_ORDER_REQUEST:
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case PLACE_SERVICE_ORDER_SUCCESS:
        case UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                order: action.payload.order
            }
        
        case PLACE_SERVICE_ORDER_FAIL:
        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getOrderDetailsReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                orders: action.payload.orders
            }
        
        case GET_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getAnOrderDetailsReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case GET_AN_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_AN_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                order: action.payload.orders
            }
    
        case GET_AN_ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const acceptOrRejectOrderReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case ACCEPT_OR_REJECT_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };

        case ACCEPT_OR_REJECT_ORDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
            }
    
        case ACCEPT_OR_REJECT_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}