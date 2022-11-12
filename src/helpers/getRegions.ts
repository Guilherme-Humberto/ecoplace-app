import { ibgeApi } from "api"

export const getMesoRegions = async () => {
    const response = await ibgeApi.get('/estados')
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}

export const getMicroregions = async (stateId: number) => {
    const response = await ibgeApi.get(`/estados/${stateId}/microrregioes`)
    return response.data.map((item: any) => ({ value: item.id, label: item.nome }))
}

export const getMicroRegionById = async (microRegionId: number) => {
    const { data: response } = await ibgeApi.get(`/microrregioes/${microRegionId}`)
    return { value: response.id, label: response.nome }
}

export const getMesoRegionById = async (mesoRegionId: number) => {
    const { data: response } = await ibgeApi.get(`/estados/${mesoRegionId}`)
    return { value: response.id, label: response.nome }
}