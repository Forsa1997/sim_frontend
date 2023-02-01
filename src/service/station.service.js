import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/stations"

const findAll = async () => {
    return await axios.get(API_URL)
}

const save = (station) => {
    return axios.post(API_URL, station)
}

const update = async (stationId, employeeId) => {
    return await axios.put(API_URL + "/" + stationId, + "/" + employeeId)
}

const exports = {
    findAll, save, update
}

export default exports;