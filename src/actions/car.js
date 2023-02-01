import { FIND_ALL_CARS, SET_MESSAGE, UPDATE_STATION } from "./types";
import CarService from "../service/car.service"

export const findAllCars = () => (dispatch) => {

    return CarService.findAll().then(
        (response) => {
            dispatch({
                type: FIND_ALL_CARS,
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

export const saveCar = (car) => (dispatch) => {

    return CarService.save(car).then(
        (response) => {
            dispatch({
                type: UPDATE_STATION,
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
