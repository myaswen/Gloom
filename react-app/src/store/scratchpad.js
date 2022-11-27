//----------------------------------------
// Action constants:
//----------------------------------------
const GET_SCRATCHPAD = "scratchpads/get";


//----------------------------------------
// Action creators:
//----------------------------------------
export const AC_getScratchpad = (scratchpad) => {
    return {
        type: GET_SCRATCHPAD,
        payload: scratchpad
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


// Initial state:

const initialState = {};

// Reducer:
const scratchpadReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SCRATCHPAD:
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default scratchpadReducer;
