import { 
  CREATE_DRIVER, 
  FIND_BY_NAME, 
  GET_DRIVERS, 
  GET_DRIVER_DETAIL, 
  GET_FILTER_DRIVERS, 
  GET_TEAMS, 
  NEXT_PAGE 
} from "./actions";

const initialState = {
  drivers: [],
  teams: [],
  dreverDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return { ...state, drivers: action.payload };
    case NEXT_PAGE:
      return { ...state, drivers: action.payload };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    case CREATE_DRIVER:
      return { ...state, drivers: [...state.drivers, action.payload] };
    case GET_DRIVER_DETAIL:
      return {...state, detail: action.payload}
    case FIND_BY_NAME:
      return {...state, drivers: action.payload} 
    case GET_FILTER_DRIVERS:
      return {...state, drivers: action.payload}
    default:
      return state;
  }
};

export default rootReducer;
