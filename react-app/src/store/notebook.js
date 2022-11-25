import normalize from "../utils/normalize";

//----------------------------------------
// Action constants:
//----------------------------------------
const GET_NOTEBOOKS = "notebooks/getNotebooks";


//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        payload: notebooks
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


// Initial state:
const initialState = {
    notebooks: {}
}

// Reducer:
const notebookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOKS:
            // Assign newState to a normalized version of
            // the data returned by the fetch:
            newState = normalize(action.payload.Notebooks);
            return newState;
        default:
            return state;
    }
}

export default notebookReducer;
