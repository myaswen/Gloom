import normalize from "../utils/normalize";

//----------------------------------------
// Action constants:
//----------------------------------------
const GET_NOTEBOOK_PAGES = "notebook/getPages";


//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getNotebookPages = (pages) => {
    return {
        type: GET_NOTEBOOK_PAGES,
        payload: pages
    }
}


//----------------------------------------
// Thunks:
//----------------------------------------
export const TH_getNotebookPages = (notebookId) => async (dispatch) => {
    // Fetch request to the api to get all the pages of a notebook:
    const response = await fetch(`/api/notebooks/${notebookId}/pages`);

    if (response.ok) {
        // If the request returns a success response,
        // dispatch the action creator:
        const pages = await response.json();
        dispatch(AC_getNotebookPages(pages));
    } else {
        // If the request returns an error response,
        // return the errors:
        const errors = await response.json();
        return errors;
    }
}


// Initial state:
const initialState = {
    user: {},
    notebook: {},
    tag: {}
}

// Reducer:
const pageReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTEBOOK_PAGES:
            // Assign newState to a normalized version of
            // the data returned by the fetch:
            newState = { ...state }
            newState.notebook = normalize(action.payload.Pages);
            return newState;
        default:
            return state;
    }
}

export default pageReducer;
