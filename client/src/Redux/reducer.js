import { 
  CREATE_DRIVER, 
  FILTER_CHANGED, 
  FIND_BY_NAME, 
  GET_DRIVERS, 
  GET_DRIVER_DETAIL, 
  GET_FILTER_DRIVERS, 
  GET_TEAMS, 
  NEXT_PAGE, 
  ORDER_CHANGE, 
  PREVIOUS_PAGE, 
  RESET_FILTERS
} from "./actions";

const initialState = {
  drivers: [],
  teams: [],
  dreverDetail: [],
  filters: {
    source: "default",
    team: "default"
  },
  order: {
    alphabetically: "default",
    birthday: "default"
  },
  page: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return { ...state, drivers: action.payload };
    case NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case PREVIOUS_PAGE:
      return { ...state, page: state.page <= 0 ? 0 : state.page - 1 };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    case CREATE_DRIVER:
      return { ...state, drivers: [...state.drivers, action.payload] };
    case GET_DRIVER_DETAIL:
      return { ...state, detail: action.payload }
    case FIND_BY_NAME:
      return { ...state, drivers: action.payload }
    case GET_FILTER_DRIVERS:
      return { ...state, drivers: action.payload }
    case FILTER_CHANGED: {

      let filters;

      if (action.payload.filter === "team") {
        filters = {...state.filters, team: action.payload.value}
      }

      if (action.payload.filter === "source") {
        filters = {...state.filters, source: action.payload.value}
      }

      return {...state, filters, page: initialState.page}
    }
    case ORDER_CHANGE:{
      let order;

      if (action.payload.order === "alphabetically") {
        order = {...state.order, alphabetically: action.payload.value}
      }

      if (action.payload.order === "birthday") {
        order = {...state.order, birthday: action.payload.value}
      }
      return{...state, order, page: initialState.page}
    }
    case RESET_FILTERS:
      return {...state, filters: initialState.filters, order: initialState.order, page: initialState.page}
    default:
      return state;
  }
};

export default rootReducer;
