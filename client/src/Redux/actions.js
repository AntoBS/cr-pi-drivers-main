import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS";
export const NEXT_PAGE = "NEXT_PAGE";
export const CREATE_DRIVER = "CREATE_DRIVER"
export const GET_TEAMS = "GET_TEAMS";
export const GET_DRIVER_DETAIL = "GET_DRIVER_DETAIL";
export const FIND_BY_NAME = "FIND_BY_NAME";
export const GET_FILTER_DRIVERS = "GET_FILTER_DRIVERS";
export const FILTER_CHANGED = "FILTER_CHANGED";
export const RESET_FILTERS = "RESET_FILTERS";
export const ORDER_CHANGE = "ORDER_CHANGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";

export const getDrivers = (page, filters, order) => {

    let offset = page * 9
    
    let url = `http://localhost:3001/drivers?offset=${offset}`;
    console.log(filters);

    if (filters.source !== "default"){
        url += `&source=${filters.source}`;
    }

    if (filters.team !== "default"){
        url += `&team=${filters.team}`;
    }

    if (order.alphabetically !== "default"){
        url += `&alphabetically=${order.alphabetically}`;
    }

    if (order.birthday !== "default"){
        url += `&birthday=${order.birthday}`;
    }


    return async (dispatch) => {
        
        const apiData = await axios.get(url);
        const drivers = apiData.data;
        dispatch({
            type: GET_DRIVERS,
            payload: drivers, 
        })
    }
}

export const nextPage = () => {
    return {
        type: NEXT_PAGE,     
    };
}

export const previousPage = () => {
    return {
        type: PREVIOUS_PAGE,     
    };
}

export const postDriver = (payload) => {
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:3001/drivers`, payload)
        const create = response.data;
        dispatch ({
            type: CREATE_DRIVER,
            payload: create
        })
    }
}

export const getTeams = () => {
    return async (dispatch) => {
        const apiData = await axios.get(`http://localhost:3001/teams`);
        const teams = apiData.data;
        dispatch({
            type: GET_TEAMS,
            payload: teams, 
        })
    }
}

export const getDriverDetail = (id) => {
    return async (dispatch) => {
        const apiData = await axios.get(`http://localhost:3001/drivers/${id}`)
        const detail = apiData.data;
        dispatch({
            type: GET_DRIVER_DETAIL,
            payload: detail,
        })
    }
}

export const findByName = (name) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(`http://localhost:3001/drivers?name=${name}`);
            const driver = apiData.data;
            dispatch({
                type: FIND_BY_NAME,
                payload: driver
            })
        } catch (error) {
            
        }
    }
}

export const filterChanged = (filter, value) => {
    return {
        type: FILTER_CHANGED, 
        payload: {
            filter: filter,
            value: value
        }
    };
}

export const orderChange = (order, value) => {
    return {
        type: ORDER_CHANGE,
        payload: {
            order: order,
            value: value,
        }
    }
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS,
    };
}