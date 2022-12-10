import React, { useState, useEffect, FormEvent } from 'react'
import { applicationApi } from '@api/index'
import Modal from '@components/molecules/Modal'
import { ModalSubTitle, ModalTitle } from '@components/molecules/Modal/styles'
import ModalUpdate from './Forms/Update'
import ModalCreate from './Forms/Create'
import {
  ICollectionsCenter,
  ISelectOptions,
  ICollectionItems
} from '@interfaces/index'
import {
  getMicroRegionById,
  getMesoRegionById,
  getMicroregions,
  getMesoRegions
} from '@helpers/getRegions'
import {
  Column,
  Constraint,
  Container,
  Title,
  Description,
  ListOfZonesCarrousel,
  ZoneCard,
  ModalTitles,
  ButtonNewItem
} from './styles'

const AdminPainelSec2FC: React.FC = () => {
  const [modalAction, setModalAction] = useState<string>('')

  const [zoneOptions, setZoneOptions] = useState<ICollectionsCenter[]>([])
  const [zones, setZones] = useState<ICollectionsCenter | null>(null)

  const [categoriesOptions, setCategoriesOptions] = useState<
    ICollectionItems[]
  >([])
  const [stateOptions, setStateOptions] = useState<ISelectOptions[]>([])
  const [cityOptions, setCityOptions] = useState([])

  const [stateValue, setStateValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )
  const [cityValue, setCityValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )

  const getZones = async () => {
    const { data: collectionsCenter } = await applicationApi.get(
      `/zone/listAll`
    )
    return setZoneOptions(collectionsCenter)
  }

  const getCategories = async () => {
    const { data: categoryResponse } = await applicationApi.get(
      `/category/listAll`
    )

    const formatedResponse = categoryResponse.data.map(
      (item: ICollectionItems) => ({
        value: item.id,
        label: item.title
      })
    )

    return setCategoriesOptions(formatedResponse)
  }

  const getMesoRegionsOptions = async () => {
    const response = await getMesoRegions()
    return setStateOptions(response)
  }

  const getMicroregionsOptions = async () => {
    const response = await getMicroregions(Number(stateValue.value))
    return setCityOptions(response)
  }

  // Busca de cidades por microRegionId
  const getCityOptionInZones = async (microRegionId: number) => {
    const microRegionResponse = await getMicroRegionById(microRegionId)
    return setCityValue(microRegionResponse)
  }

  // Busca de estados por microRegionId
  const getStateOptionInZones = async (mesoRegionId: number) => {
    const mesoRegionResponse = await getMesoRegionById(mesoRegionId)
    return setStateValue(mesoRegionResponse)
  }

  const openModalUpdate = (item: ICollectionsCenter) => {
    setZones(item)
    getStateOptionInZones(Number(item.mesoregion_id))
    getCityOptionInZones(Number(item.microregion_id))
    return setModalAction('update')
  }

  const openModalCreate = () => {
    setZones({} as ICollectionsCenter)
    return setModalAction('create')
  }

  useEffect(() => {
    getZones()
    getCategories()
    getMesoRegionsOptions()
  }, [])

  useEffect(() => {
    getMicroregionsOptions()
  }, [stateValue.value])

  return (
    <>
      <Container>
        <Constraint>
          <Column>
            <Title>Zonas de coleta</Title>
            <ButtonNewItem onClick={openModalCreate}>
              Novo zona de coleta
            </ButtonNewItem>
          </Column>
          <Column>
            <ListOfZonesCarrousel>
              {zoneOptions.map((item, index) => (
                <ZoneCard key={index} onClick={() => openModalUpdate(item)}>
                  <Title>{item.name}</Title>
                  <Description>{item.description}</Description>
                </ZoneCard>
              ))}
            </ListOfZonesCarrousel>
          </Column>
        </Constraint>
      </Container>
      {modalAction == 'update' && (
        <Modal
          minWidth={'1100px'}
          maxWidth={'1100px'}
          maxHeight={'90%'}
          withScroll
          event={() => {
            setModalAction('')
          }}
        >
          <ModalTitles>
            <ModalTitle>Atualizar zona de coleta</ModalTitle>
            <ModalSubTitle>Atualizar zona de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalUpdate
            item={zones as ICollectionsCenter}
            stateValue={stateValue}
            stateOptions={stateOptions}
            cityValue={cityValue}
            cityOptions={cityOptions}
            setStateValue={setStateValue}
            setCityValue={setCityValue}
            setModalAction={setModalAction}
            getZones={getZones}
            categoriesOptions={categoriesOptions}
          />
        </Modal>
      )}
      {modalAction == 'create' && (
        <Modal
          minWidth={'1100px'}
          maxWidth={'1100px'}
          maxHeight={'90%'}
          withScroll
          event={() => {
            setModalAction('')
          }}
        >
          <ModalTitles>
            <ModalTitle>Criar zona de coleta</ModalTitle>
            <ModalSubTitle>Criar zona de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalCreate
            item={zones as ICollectionsCenter}
            stateValue={stateValue}
            stateOptions={stateOptions}
            cityValue={cityValue}
            cityOptions={cityOptions}
            setStateValue={setStateValue}
            setCityValue={setCityValue}
            setModalAction={setModalAction}
            getZones={getZones}
            categoriesOptions={categoriesOptions}
          />
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec2FC
