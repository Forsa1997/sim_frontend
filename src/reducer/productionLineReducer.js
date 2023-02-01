import { FIND_ALL_PRODUCTION_LINES } from "../actions/types";

const initialState = {
    productionLines: [
        {
            id: 1,
            name: "Golflinie",
            status: "runnable",
            simStatus: "stopped",
            car: {
                id: 1,
                name: "Golf",
                multiplier: 0.5,
            },
            robots: {
                "1": 1,
                "3": 2,
                "5": 3
            },
            stations: {
                "2": 1,
                "4": 2,
                "6": 3
            },
            report: {
                id: 1,
                startTime: [
                    2023,
                    1,
                    30,
                    20,
                    6,
                    23,
                    984238000
                ],
                prodAmount: 230,
                runDuration: 5327.0,
                multiplier: 1,
                carName: "Golf"
            }
        },
        {
            id: 2,
            name: "Tiguanlinie",
            status: "runnable",
            simStatus: "stopped",
            car: {
                id: 3,
                name: "Passat",
                multiplier: 1.2,
            },
            robots: {
                "1": 4,
                "3": 5,
                "5": 6
            },
            stations: {
                "2": 4,
                "4": 5,
                "6": 6
            },
            report: {
                id: 3,
                prodAmount: 25,
                carName: "Tiguan",
                multiplier: 1
            }
        },
        {
            id: 3,
            name: "Touareglinie",
            status: "runnable",
            simStatus: "running",
            car: {
                id: 4,
                name: "Tiguan",
                multiplier: 1.5,
            },
            robots: {
                "1": 7,
                "3": 8,
                "5": 9
            },
            stations: {
                "2": 7,
                "4": 8,
                "6": 9
            },
            report: {
                id: 4,
                prodAmount: 200,
                carName: "Touareg",
                multiplier: 1
            }
        },
        {
            id: 4,
            name: "Uplinie",
            status: "incomplete",
            simStatus: "stopped",
            car: {
                id: 5,
                name: "Touareg",
                multiplier: 2.0,
            },
            robots: {
                "1": 10,
                "3": 11,
                "5": 12
            },
            stations: {
                "2": 10,
                "4": 11,
                "6": 12
            },
            report: {
                id: 5,
                startTime: [
                    2023,
                    1,
                    30,
                    18,
                    31,
                    24,
                    797087000
                ],
                prodAmount: 700,
                carName: "Up",
                multiplier: 1
            }
        },

    ]
};

const productionLineReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_ALL_PRODUCTION_LINES:
            return { ...state, productionLines: payload.data }
        default:
            return state;
    }
}

export default productionLineReducer;