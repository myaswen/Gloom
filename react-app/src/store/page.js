import normalize from "../utils/normalize";

//----------------------------------------
// Action constants:
//----------------------------------------
const GET_NOTEBOOK_PAGES = "notebook/getPages";
const CREATE_NOTEBOOK_PAGE = "notebooks/pages/new";

//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getNotebookPages = (pages) => {
    return {
        type: GET_NOTEBOOK_PAGES,
        payload: pages
    }
}

export const AC_createNotebookPage = (newNotebookPage) => {
    return {
        type: CREATE_NOTEBOOK_PAGE,
        payload: newNotebookPage
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

export const TH_createNotebookPage = (notebookId) => async (dispatch) => {
    const response = await fetch(`/api/notebooks/${notebookId}/pages`, {
        method: "POST"
    });

    if (response.ok) {
        const newNotebookPage = await response.json();
        await dispatch(AC_createNotebookPage(newNotebookPage));
        return newNotebookPage;
    } else {
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
            newState = { ...state };
            newState.notebook = normalize(action.payload.Pages);
            return newState;
        case CREATE_NOTEBOOK_PAGE:
            newState = { ...state };
            newState.notebook[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default pageReducer;
