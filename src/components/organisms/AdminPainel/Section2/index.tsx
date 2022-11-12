import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { applicationApi } from '@api/index'
import Modal from '@components/molecules/Modal'
import {
  ICollectionsCenter,
  ISelectOptions,
  ICollectionItems
} from '@interfaces/index'
import { ModalSubTitle, ModalTitle } from '@components/molecules/Modal/styles'
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
  ModalForm,
  InputGroup,
  InputGruopGrid,
  SelectState,
  customSelectStyles,
  AddresBlock,
  CollectionItemList,
  CollectionItemCard,
  CollectionItemBtnRemove,
  ButtonForm
} from './styles'
import InputFC from '@components/atoms/Input'

const AdminPainelSec2FC: React.FC = () => {
  const [modalAction, setModalAction] = useState<string>('')

  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [collectionsCenterOptions, setCollectionsCenterOptions] = useState<ICollectionsCenter[]>([])
  const [collectionCenter, setCollectionCenter] = useState<ICollectionsCenter | null>(null)

  const [collectionsItemOptions, setCollectionsItemOptions] = useState<ICollectionItems[]>([])
  const [stateOptions, setStateOptions] = useState<ISelectOptions[]>([])
  const [cityOptions, setCityOptions] = useState([])

  const [collectionItemValues, setCollectionItemValues] = useState<ISelectOptions[]>([])
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

    const formatedResponse = collectionsItem.map(item => ({
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

  const addCollectionsItem = (newItem: ISelectOptions) => {
    const itemAlreadyExists = collectionItemValues.find(
      item => item.value == newItem.value
    )
    if (!itemAlreadyExists)
      return setCollectionItemValues(state => [...state, newItem])
  }

  const removeCollectionsItem = (itemId: string) => {
    const filterItemsDifferents = collectionItemValues.filter(
      item => item.value !== itemId
    )
    return setCollectionItemValues(filterItemsDifferents)
  }

  const openModalUpdate = (
    item: ICollectionsCenter,
    mesoRegionId: number,
    microRegionId: number
  ) => {
    setCollectionCenter(item)
    getStateOptionInCollectionCenter(mesoRegionId)
    getCityOptionInCollectionCenter(microRegionId)

    setName(item.name)
    setImage(item.image)
    setEmail(item.email)
    setPhone(item.phone)
    setDescription(item.description)

    const formatedCollectionItems = item.items.map(item => ({
      value: item.id,
      label: item.title
    }))

    setCollectionItemValues(formatedCollectionItems)
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
          </Column>
          <Column>
            <ListOfCollections>
              {collectionsCenterOptions.map((item, index) => (
                <CollectionCenterCard
                  key={index}
                  onClick={() => {
                    openModalUpdate(
                      item,
                      Number(item.mesoregion_id),
                      Number(item.microregion_id)
                    )
                    setModalAction('update')
                  }}
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
          minWidth={'800px'}
          maxWidth={'800px'}
          maxHeight={'90%'}
          withScroll
          event={() => setModalAction('')}
        >
          <ModalTitles>
            <ModalTitle>Atualizar ponto de coleta</ModalTitle>
            <ModalSubTitle>Atualizar ponto de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalForm>
            <InputGroup>
              <strong>Dados</strong>
              <small>Edite as informações do ponto de coleta</small>
              <InputFC
                required
                type={'text'}
                value={image}
                setState={setImage}
                placeholder={'Imagem do ponto de coleta'}
              />
              <InputFC
                required
                type={'text'}
                value={name}
                setState={setName}
                placeholder={'Nome do ponto de coleta'}
              />
              <InputFC
                required
                type={'text'}
                value={description}
                setState={setDescription}
                placeholder={'Descrição'}
              />
              <InputGruopGrid>
                <InputFC
                  required
                  type={'email'}
                  value={email}
                  setState={setEmail}
                  placeholder={'E-mail'}
                />
                <InputFC
                  required
                  type={'text'}
                  value={phone}
                  setState={setPhone}
                  placeholder={'Whatsapp'}
                />
              </InputGruopGrid>
            </InputGroup>
            <InputGroup>
              <strong>Endereço</strong>
              <small>Edite os endereços do ponto de coleta</small>
              {collectionCenter?.addresses?.map(item => (
                <AddresBlock key={item.id}>
                  <InputGruopGrid>
                    <SelectState
                      value={stateValue}
                      options={stateOptions}
                      styles={customSelectStyles}
                      placeholder="Selecione o estado"
                      onChange={option =>
                        setStateValue(option as ISelectOptions)
                      }
                    />
                    <SelectState
                      value={cityValue}
                      options={cityOptions}
                      styles={customSelectStyles}
                      onChange={option =>
                        setCityValue(option as ISelectOptions)
                      }
                      placeholder="Selecione o cidade"
                    />
                  </InputGruopGrid>
                  <InputFC
                    required
                    type={'text'}
                    value={item.zip_code}
                    setState={() => {}}
                    placeholder={'CEP'}
                  />
                  <InputGruopGrid>
                    <InputFC
                      required
                      type={'text'}
                      value={item.addrs_name}
                      setState={() => {}}
                      placeholder={'Logradouro'}
                    />
                    <InputFC
                      required
                      type={'text'}
                      value={String(item.addrs_number)}
                      setState={() => {}}
                      placeholder={'Número'}
                    />
                  </InputGruopGrid>
                </AddresBlock>
              ))}
            </InputGroup>
            <InputGroup>
              <strong>Items de coleta</strong>
              <small>Remove o adicione novos items de coleta</small>
              <SelectState
                value={collectionItemValues}
                options={collectionsItemOptions}
                styles={customSelectStyles}
                placeholder="Selecione o item de coleta"
                onChange={(option: any) => addCollectionsItem(option)}
              />
              <CollectionItemList>
                {collectionItemValues?.map(item => (
                  <CollectionItemCard key={item.value}>
                    <CollectionItemBtnRemove
                      onClick={() => removeCollectionsItem(String(item.value))}
                    >
                      <AiOutlineClose size={13} />
                    </CollectionItemBtnRemove>
                    <small>{item.label}</small>
                  </CollectionItemCard>
                ))}
              </CollectionItemList>
            </InputGroup>
            <ButtonForm>Salver alterações</ButtonForm>
          </ModalForm>
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec2FC
