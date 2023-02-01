import { FIND_ALL_ROBOTS, SAVE_ROBOT, SET_MESSAGE } from "./types";
import RobotService from "../service/robot.service"

export const findAllRobots = () => (dispatch) => {

    return RobotService.findAll().then(
        (response) => {
            dispatch({
                type: FIND_ALL_ROBOTS,
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

export const saveRobot = (robot) => (dispatch) => {

    return RobotService.save(robot).then(
        (response) => {
            dispatch({
                type: SAVE_ROBOT,
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
