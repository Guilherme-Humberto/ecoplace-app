import axios from 'axios'

export const applicationApi = axios.create({
    baseURL: 'http://localhost:3333'
})

export const ibgeApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
})