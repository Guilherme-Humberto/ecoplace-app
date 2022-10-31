import axios from "axios"

const ibgeApiStates = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

export const getStates = async () => {
    const response = await axios.get(ibgeApiStates)
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}

export const getMicroregions = async (stateId: number) => {
    const response = await axios.get(`${ibgeApiStates}/${stateId}/microrregioes`)
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}