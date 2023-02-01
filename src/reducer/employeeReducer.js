import { FIND_ALL_EMPLOYEES, SAVE_EMPLOYEE } from "../actions/types";

const initialState = {
    employees: [
        {
            id: 1,
            name: 'Rüdiger',
            assigned: true,
        },
        {
            id: 2,
            name: 'Manfred',
            assigned: true,
        },
        {
            id: 3,
            name: 'Günther',
            assigned: true,
        },
        {
            id: 4,
            name: 'Nico',
            assigned: true,
        },
        {
            id: 5,
            name: 'Waldemar',
            assigned: true,
        },
        {
            id: 6,
            name: 'Christoph',
            assigned: true,
        }
    ]
};

const employeeReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FIND_ALL_EMPLOYEES:
            return { ...state, employees: payload.data }
        case SAVE_EMPLOYEE:
            return {...state, employees: [...state.employees, payload.data]}
        default:
            return state;
    }
}

export default employeeReducer;