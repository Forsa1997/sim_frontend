import { FIND_ALL_CARS, SAVE_CAR } from "../actions/types";

const initialState = {
    cars: [
        {
            id: 1,
            name: "Golf",
            multiplier: 0.5
        },
        {
            id: 2,
            name: "Polo",
            multiplier: 0.8
        },
        {
            id: 3,
            name: "Passat",
            multiplier: 1.2
        },
        {
            id: 4,
            name: "Tiguan",
            multiplier: 1.5
        },
        {
            id: 5,
            name: "Touareg",
            multiplier: 2.0
        }
    ]
};

const carReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_ALL_CARS:
            return { ...state, cars: payload.data }
        case SAVE_CAR:
            return { ...state, cars: [...state.cars, payload.data] }
        default:
            return state;
    }
}

export default carReducer;