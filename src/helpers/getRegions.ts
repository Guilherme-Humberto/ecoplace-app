import { ibgeApi } from "api"

export const getStates = async () => {
    const response = await ibgeApi.get('/estados')
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}

export const getMicroregions = async (stateId: number) => {
    const response = await ibgeApi.get(`/estados/${stateId}/microrregioes`)
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}