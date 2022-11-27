import normalize from "../utils/normalize";

//----------------------------------------
// Action constants:
//----------------------------------------
const GET_NOTEBOOK_PAGES = "notebook/getPages";
const CREATE_NOTEBOOK_PAGE = "notebook/pages/new";
const EDIT_PAGE = "page/edit";
const DELETE_PAGE = "page/delete";

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

export const AC_editPage = (editedPage) => {
    return {
        type: EDIT_PAGE,
        payload: editedPage
    }
}

export const AC_deletePage = (pageId) => {
    return {
        type: DELETE_PAGE,
        payload: pageId
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

export const TH_editPage = (pageId, editData) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
    });

    if (response.ok) {
        const editedPage = await response.json();
        await dispatch(AC_editPage(editedPage));
        return editedPage;
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const TH_deletePage = (pageId) => async (dispatch) => {
    const response = await fetch(`/api/pages/${pageId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        await dispatch(AC_deletePage(pageId));
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
            newState = {
                user: {...state.user},
                notebook: {...state.notebook},
                tag: {...state.tag}
            };
            newState.notebook = normalize(action.payload.Pages);
            return newState;
        case CREATE_NOTEBOOK_PAGE:
            newState = {
                user: {...state.user},
                notebook: {...state.notebook},
                tag: {...state.tag}
            };
            newState.notebook[action.payload.id] = action.payload;
            return newState;
        case EDIT_PAGE:
            newState = {
                user: {...state.user},
                notebook: {...state.notebook},
                tag: {...state.tag}
            };
            newState.notebook[action.payload.id] = action.payload;
            return newState;
        case DELETE_PAGE:
            newState = {
                user: {...state.user},
                notebook: {...state.notebook},
                tag: {...state.tag}
            };
            delete newState.notebook[action.payload];
            return newState;
        default:
            return state;
    }
}

export default pageReducer;
