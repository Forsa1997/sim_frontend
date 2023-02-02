import axios from 'axios';

const API_URL = "https://prosim-backend.azurewebsites.net/api/v1/productionLines"

const findAll = async () => {
    return await axios.get(API_URL)
}

const save = (productionLine) => {
    return axios.post(API_URL, productionLine)
}

const start = (prodLineId, multiplier, carId) => {
    return axios.put(API_URL + "/start/" + prodLineId + "/" + multiplier + "/" + carId)
}

const stop = (id) => {
    return axios.put(API_URL + "/stop/" + id, {}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
const exports = {
    findAll, save, start, stop
}

export default exports;