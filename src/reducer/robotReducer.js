import { FIND_ALL_ROBOTS, SAVE_ROBOT } from "../actions/types";

const initialState = {
    robots: [
        { name: "ABB Robot", duration: 2.4 },
        { name: "Kuka Robot", duration: 1.5 },
        { name: "Robot1", duration: 28.4 },
        { name: "Robot2", duration: 17.5 },
        { name: "Robot3", duration: 26.4 },
        { name: "Robot4", duration: 15.5 },
    ]
};

const robotReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_ALL_ROBOTS:
            return { ...state, robots: payload.data }
        case SAVE_ROBOT:
            return { ...state, robots: [...state.robots, payload.data] }
        default:
            return state;
    }
}

export default robotReducer;