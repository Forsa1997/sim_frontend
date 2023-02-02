import axios from 'axios';

const API_URL = "https://prosim-backend.azurewebsites.net/api/v1/employees"

const findAll = async () => {
    return await axios.get(API_URL)
}

const save = (employee) => {
    return axios.post(API_URL, employee)
}

const exports = {
    findAll, save
}

export default exports;