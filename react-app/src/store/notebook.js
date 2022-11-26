import normalize from "../utils/normalize";

//----------------------------------------
// Action constants:
//----------------------------------------
const GET_NOTEBOOKS = "notebooks/getNotebooks";
const SET_CURRENT_NOTEBOOK = "notebooks/setCurrent";
const CREATE_NOTEBOOK = "notebooks/create";


//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        payload: notebooks
    }
}

export const AC_setCurrentNotebook = (notebookData) => {
    return {
        type: SET_CURRENT_NOTEBOOK,
        payload: notebookData
    }
}

export const AC_createNotebook = (newNotebook) => {
    return {
        type: CREATE_NOTEBOOK,
        payload: newNotebook
    }
}

//----------------------------------------
// Thunks:
//----------------------------------------
export const TH_getNotebooks = () => async (dispatch) => {
    // Fetch request to the api to get all the notebooks a user owns:
    const response = await fetch(`/api/notebooks`);

    if (response.ok) {
        // If the request returns a success response,
        // dispatch the action creator:
        const notebooks = await response.json();
        dispatch(AC_getNotebooks(notebooks));
    } else {
        // If the request returns an error response,
        // return the errors:
        const errors = await response.json();
        return errors;
    }
}

export const TH_setCurrentNotebook = (notebookData) => (dispatch) => {
    dispatch(AC_setCurrentNotebook(notebookData));
}

export const TH_createNotebook = () => async (dispatch) => {
    const response = await fetch(`/api/notebooks`, {
        method: "POST"
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(AC_createNotebook(data));
    }
}


// Initial state:
const initialState = {
    all: {},
    current: {}
}

// Reducer:
const notebookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            // Assign newState to a normalized version of
            // the data returned by the fetch:
            newState = { ...state };
            newState.all = normalize(action.payload.Notebooks);
            return newState;
        case SET_CURRENT_NOTEBOOK:
            newState = { ...state };
            newState.current = action.payload;
            return newState;
        case CREATE_NOTEBOOK:
            newState = { ...state };
            newState.all = { ...state.all };
            newState.all[action.payload.id] = action.payload;
            newState.current = action.payload;
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
