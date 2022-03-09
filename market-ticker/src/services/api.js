import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
})

export const apiPapperstone = axios.create({
    baseURL: 'https://live-pricing.pepperstone.com'
})