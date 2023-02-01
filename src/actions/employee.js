import { FIND_ALL_EMPLOYEES, SAVE_EMPLOYEE, SET_MESSAGE } from "./types";
import EmployeeService from "../service/employee.service"

export const findAllEmployees = () => (dispatch) => {

    return EmployeeService.findAll().then(
        (response) => {
            dispatch({
                type: FIND_ALL_EMPLOYEES,
                payload: response,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};

export const saveEmployee = (employee) => (dispatch) => {

    return EmployeeService.save(employee).then(
        (response) => {
            dispatch({
                type: SAVE_EMPLOYEE,
                payload: response,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            return Promise.reject();
        }
    );
};
