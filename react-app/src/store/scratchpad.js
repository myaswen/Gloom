//----------------------------------------
// Action constants:
//----------------------------------------
const GET_SCRATCHPAD = "scratchpads/get";
const EDIT_SCRATCHPAD = "scratchpads/edit";


//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getScratchpad = (scratchpad) => {
    return {
        type: GET_SCRATCHPAD,
        payload: scratchpad
    }
}

export const AC_editScratchpad = (editedScratchpad) => {
    return {
        type: EDIT_SCRATCHPAD,
        payload: editedScratchpad
    }
}


//----------------------------------------
// Thunks:
//----------------------------------------
export const TH_getScratchpad = () => async (dispatch) => {
    const response = await fetch(`/api/scratchpads`);

    if (response.ok) {
        const scratchpad = await response.json();
        dispatch(AC_getScratchpad(scratchpad));
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const TH_editScratchpad = (scratchpadId, editData) => async (dispatch) => {
    const response = await fetch(`/api/scratchpads/${scratchpadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData)
    });

    if (response.ok) {
        const editedScratchpad = await response.json();
        await dispatch(AC_editScratchpad(editedScratchpad));
        return editedScratchpad;
    } else {
        const errors = await response.json();
        return errors;
    }
}


// Initial state:

const initialState = {};

// Reducer:
const scratchpadReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SCRATCHPAD:
            newState = action.payload;
            return newState;
        case EDIT_SCRATCHPAD:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default scratchpadReducer;
