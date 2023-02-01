import { FIND_ALL_PRODUCTION_LINES, SET_MESSAGE } from "./types";
import ProductionLineService from "../service/productionLine.service"

export const findAllProductionLines = () => (dispatch) => {

    return ProductionLineService.findAll().then(
        (response) => {
            dispatch({
                type: FIND_ALL_PRODUCTION_LINES,
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

export const saveProductionLine = (productionLine) => (dispatch) => {

    return ProductionLineService.save(productionLine).then(
        (response) => {
            // dispatch({
            //     type: FIND_ALL_PRODUCTION_LINES,
            //     payload: response,
            // })
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


export const startProductionLine = (prodLineId, multiplier, carId) => (dispatch) => {

    return ProductionLineService.start(prodLineId, multiplier, carId).then(
        (response) => {
            dispatch(findAllProductionLines());
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

export const stopProductionLine = (id) => (dispatch) => {

    return ProductionLineService.stop(id).then(
        (response) => {
            dispatch(findAllProductionLines());
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

