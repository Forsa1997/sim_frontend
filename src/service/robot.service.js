import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/robots"

const findAll = async () => {
    return await axios.get(API_URL)
}

const save = (robot) => {
    return axios.post(API_URL, robot)
}

const exports = {
    findAll, save
}

export default exports;