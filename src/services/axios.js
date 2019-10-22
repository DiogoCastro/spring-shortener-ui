import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://encurtai.herokuapp.com/api'
});

Axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

export default axios;