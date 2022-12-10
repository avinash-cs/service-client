import { GET_A_SERVICE_DETAIL_REQUEST, GET_A_SERVICE_DETAIL_SUCCESS, GET_A_SERVICE_DETAIL_FAIL, CLEAR_ERRORS, NEW_SERVICE_FAIL, NEW_SERVICE_REQUEST, NEW_SERVICE_RESET, NEW_SERVICE_SUCCESS,NEW_CATEGORY_FAIL,NEW_CATEGORY_REQUEST,NEW_CATEGORY_RESET,NEW_CATEGORY_SUCCESS, GET_ALL_CATEGORIES_REQUEST, GET_ALL_CATEGORIES_SUCCESS, GET_ALL_CATEGORIES_FAIL, GET_ALL_SERVICES_REQUEST, GET_ALL_SERVICES_SUCCESS, GET_ALL_SERVICES_FAIL } from '../constants/serviceConstants';

export const newServiceReducer = (state = { service: {} }, action) => {
  switch (action.type) {
    case NEW_SERVICE_REQUEST:
    case NEW_CATEGORY_REQUEST:
    case GET_ALL_SERVICES_REQUEST:
    case GET_A_SERVICE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_SERVICE_SUCCESS:
    case NEW_CATEGORY_SUCCESS:
    case GET_A_SERVICE_DETAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        service: action.payload.service,
      };

    case GET_ALL_SERVICES_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        services: action.payload,
      };
    case NEW_SERVICE_FAIL:
    case NEW_CATEGORY_FAIL:
    case GET_ALL_SERVICES_FAIL:
    case GET_A_SERVICE_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_SERVICE_RESET:
      case NEW_CATEGORY_RESET:
      return {
        service: {},
        success: false,
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

export const newCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
      case GET_ALL_CATEGORIES_REQUEST:
      case NEW_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
   
      case NEW_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        category: action.payload.category,
      };
 
      case GET_ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        categories: action.payload,
      };

      case GET_ALL_CATEGORIES_FAIL:
      case NEW_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  
      case NEW_CATEGORY_RESET:
      return {
        ...state,
        success: false,
      };
  
    default:
      return state;
  }
};
