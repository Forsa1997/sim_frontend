import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/cars"

const findAll = async () => {
    return await axios.get(API_URL)
}

const save = (car) => {
    return axios.post(API_URL, car)
}

const exports = {
    findAll, save
}

export default exports;