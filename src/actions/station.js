import { FIND_ALL_STATIONS, SET_MESSAGE, UPDATE_STATION } from "./types";
import StationService from "../service/station.service"

export const findAllStations = () => (dispatch) => {


    return StationService.findAll().then(
        (response) => {
            dispatch({
                type: FIND_ALL_STATIONS,
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


export const saveStation = (station) => (dispatch) => {

    return StationService.save(station).then(
        (response) => {
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

export const updateStation = (stationId, employeeId) => (dispatch) => {

    return StationService.update(stationId, employeeId).then(
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
}
