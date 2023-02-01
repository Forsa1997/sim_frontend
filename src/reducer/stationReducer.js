import { FIND_ALL_STATIONS, SAVE_STATION, UPDATE_STATION } from "../actions/types";

const initialState = {
    stations: [
        { name: "Unterbodenschutz anbringen", duration: 0.5 },
        { name: "Stopfen setzen", duration: 6.4 },
        { name: "Bohren", duration: 3.5 },
        { name: "Schrauben", duration: 65.4 },
        { name: "Schweißen", duration: 4.5 },
        { name: "Ei legen", duration: 63.4 },
    ]
};

const stationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_ALL_STATIONS:
            return { ...state, stations: payload.data }
        case SAVE_STATION:
            return { ...state, stations: [...state.stations, payload.data] }
        case UPDATE_STATION:
            return { ...state, stations: [...state.stations, payload.data] }
        default:
            return state;
    }
}

export default stationReducer;