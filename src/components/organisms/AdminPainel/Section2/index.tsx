import React, { useState, useEffect, FormEvent } from 'react'
import { applicationApi } from '@api/index'
import Modal from '@components/molecules/Modal'
import { ModalSubTitle, ModalTitle } from '@components/molecules/Modal/styles'
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
  ListOfCollections,
  CollectionCenterCard,
  ModalTitles,
  ButtonNewItem
} from './styles'
import ModalUpdate from './Forms/Update'
import ModalCreate from './Forms/Create'

const AdminPainelSec2FC: React.FC = () => {
  const [modalAction, setModalAction] = useState<string>('')

  const [collectionsCenterOptions, setCollectionsCenterOptions] = useState<ICollectionsCenter[]>([])
  const [collectionCenter, setCollectionCenter] = useState<ICollectionsCenter | null>(null)

  const [collectionsItemOptions, setCollectionsItemOptions] = useState<ICollectionItems[]>([])
  const [stateOptions, setStateOptions] = useState<ISelectOptions[]>([])
  const [cityOptions, setCityOptions] = useState([])

  const [stateValue, setStateValue] = useState<ISelectOptions>({} as ISelectOptions)
  const [cityValue, setCityValue] = useState<ISelectOptions>({} as ISelectOptions)

  const getCollectionsCenter = async () => {
    const { data: collectionsCenter } = await applicationApi.get(
      `/collectionCenter/listAll`
    )
    return setCollectionsCenterOptions(collectionsCenter)
  }

  const getCollectionsItem = async () => {
    const { data: collectionsItem } = await applicationApi.get(
      `/collectionItem/listAll`
    )

    const formatedResponse = collectionsItem.map((item: ICollectionItems) => ({
      value: item.id,
      label: item.title
    }))

    return setCollectionsItemOptions(formatedResponse)
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
  const getCityOptionInCollectionCenter = async (microRegionId: number) => {
    const microRegionResponse = await getMicroRegionById(microRegionId)
    return setCityValue(microRegionResponse)
  }

  // Busca de estados por microRegionId
  const getStateOptionInCollectionCenter = async (mesoRegionId: number) => {
    const mesoRegionResponse = await getMesoRegionById(mesoRegionId)
    return setStateValue(mesoRegionResponse)
  }

  const openModalUpdate = (item: ICollectionsCenter) => {
    setCollectionCenter(item)
    getStateOptionInCollectionCenter(Number(item.mesoregion_id))
    getCityOptionInCollectionCenter(Number(item.microregion_id))
    return setModalAction('update')
  }

  const openModalCreate = () => {
    setCollectionCenter({} as ICollectionsCenter)
    return setModalAction('create')
  }

  useEffect(() => {
    getCollectionsCenter()
    getCollectionsItem()
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
            <Title>Pontos de coleta</Title>
            <ButtonNewItem onClick={openModalCreate}>Novo Ponto de coleta</ButtonNewItem>
          </Column>
          <Column>
            <ListOfCollections>
              {collectionsCenterOptions.map((item, index) => (
                <CollectionCenterCard
                  key={index}
                  onClick={() => openModalUpdate(item)}
                >
                  <Title>{item.name}</Title>
                  <Description>{item.description}</Description>
                </CollectionCenterCard>
              ))}
            </ListOfCollections>
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
            <ModalTitle>Atualizar ponto de coleta</ModalTitle>
            <ModalSubTitle>Atualizar ponto de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalUpdate
            item={collectionCenter as ICollectionsCenter}
            stateValue={stateValue}
            stateOptions={stateOptions}
            cityValue={cityValue}
            cityOptions={cityOptions}
            setStateValue={setStateValue}
            setCityValue={setCityValue}
            setModalAction={setModalAction}
            getCollectionsCenter={getCollectionsCenter}
            collectionsItemOptions={collectionsItemOptions}
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
            <ModalTitle>Criar novo ponto de coleta</ModalTitle>
            <ModalSubTitle>Criar ponto de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalCreate
            item={collectionCenter as ICollectionsCenter}
            stateValue={stateValue}
            stateOptions={stateOptions}
            cityValue={cityValue}
            cityOptions={cityOptions}
            setStateValue={setStateValue}
            setCityValue={setCityValue}
            setModalAction={setModalAction}
            getCollectionsCenter={getCollectionsCenter}
            collectionsItemOptions={collectionsItemOptions}
          />
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec2FC
