import React, { useState, useEffect, FormEvent } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import InputFC from '@components/atoms/Input'
import {
  IAddrsses,
  ICollectionsCenter,
  ISelectOptions
} from '@interfaces/index'
import {
  Container,
  InputGroup,
  InputGruopGrid,
  SelectState,
  customSelectStyles,
  AddresBlock,
  AddresTabWrapper,
  AddresTabItem,
  CollectionItemList,
  CollectionItemCard,
  CollectionItemBtnRemove,
  ButtonForm,
  ModalForm
} from './styles'
import { applicationApi } from '@api/index'

interface IModalUpdate {
  item: ICollectionsCenter
  stateValue: ISelectOptions
  stateOptions: ISelectOptions[]
  cityValue: ISelectOptions
  cityOptions: ISelectOptions[]
  collectionsItemOptions: any[]
  getCollectionsCenter: () => void
  setStateValue: React.Dispatch<React.SetStateAction<ISelectOptions>>
  setCityValue: React.Dispatch<React.SetStateAction<ISelectOptions>>
  setModalAction: React.Dispatch<React.SetStateAction<string>>
}

const ModalUpdate: React.FC<IModalUpdate> = ({
  item,
  stateValue,
  stateOptions,
  setStateValue,
  cityValue,
  cityOptions,
  setCityValue,
  getCollectionsCenter,
  setModalAction,
  collectionsItemOptions
}) => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [addrsName, setAddrsName] = useState<string>('')
  const [addrsNumber, seAddrsNumber] = useState<number>(0)
  const [addrsZipCode, setAddrsZipCode] = useState<string>('')
  const [addrsDistrict, setAddrsDistrict] = useState<string>('')
  const [addrsObj, setAddrsObj] = useState<IAddrsses | null>({} as IAddrsses)
  const [collectionItemValues, setCollectionItemValues] = useState<ISelectOptions[]>([])
  const [delCollectionItemValues, setDelCollectionItemValues] = useState<string[]>([])

  const openTabAddrsItem = (item: IAddrsses) => {
    setAddrsName(item.addrs_name)
    seAddrsNumber(item.addrs_number)
    setAddrsZipCode(item.zip_code)
    setAddrsDistrict(item.district)
  }

  const openModalUpdate = () => {
    setName(item.name)
    setImage(item.image)
    setEmail(item.email)
    setPhone(item.phone)
    setDescription(item.description)
    setAddrsObj(null)

    const formatedCollectionItems = item.items.map(item => ({
      value: item.id,
      label: item.title
    }))

    setCollectionItemValues(formatedCollectionItems)
  }

  const updateCollectionCenter = async (data: object) => {
    return await applicationApi.put(`/collectionCenter/update`, data, {
      params: { id: item?.id }
    })
  }

  const updateCollectionCenterAddrs = async (data: object) => {
    return await applicationApi.put(`/collectionAddrs/update`, data, {
      params: {
        collection_addrs_id: addrsObj?.id,
        collection_center_id: item?.id
      }
    })
  }

  const updateCollectionCenterItems = async (data: string[]) => {
    return await applicationApi.put(`/collectionCenter/items/update`, { data }, {
      params: { id: item?.id }
    })
  }

  const removeCollectionCenterItems = async (data: string[]) => {
    return await applicationApi.put(`/collectionCenter/items/delete`, { data }, {
      params: { id: item?.id }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()

      const collectionAddrsData = {
        addrs_name: addrsName,
        zip_code: addrsZipCode,
        district: addrsDistrict,
        addrs_number: addrsNumber,
        mesoregion_id: stateValue.value,
        microregion_id: cityValue.value
      }

      const collectionCenterData = {
        name,
        image,
        email,
        phone,
        description
      }

      await updateCollectionCenter(collectionCenterData)

      if (addrsObj !== null) {
        await updateCollectionCenterAddrs(collectionAddrsData)
      }

      const aditionalItems: any = []

      collectionItemValues.map((itemData, index) => {
        if (itemData.value !== item.items[index]?.id) {
          aditionalItems.push(collectionItemValues[index].value)
        }
      })

      if (aditionalItems.length > 0) {
        await updateCollectionCenterItems(aditionalItems)
      }

      if (delCollectionItemValues.length > 0) {
        await removeCollectionCenterItems(delCollectionItemValues)
      }

      getCollectionsCenter()
      return setModalAction('')
    } catch (error) {
      console.log(error)
    }
  }

  const addCollectionsItem = (newItem: ISelectOptions) => {
    const itemAlreadyExists = collectionItemValues.find(
      item => item.value == newItem.value
    )
    if (!itemAlreadyExists) {
      return setCollectionItemValues(state => [...state, newItem])
    }
  }

  const removeCollectionsItem = (itemId: string) => {
    const filterItemsDifferents = collectionItemValues.filter(
      item => item.value !== itemId
    )
    setDelCollectionItemValues(state => [...state, itemId])
    return setCollectionItemValues(filterItemsDifferents)
  }

  useEffect(() => {
    openModalUpdate()
  }, [item.id])

  return (
    <Container>
      <ModalForm onSubmit={handleSubmit}>
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
          {item.addresses?.map(item => (
            <AddresBlock key={item.id}>
              <AddresTabItem
                open={addrsObj !== null}
                onClick={() => {
                  openTabAddrsItem(item)
                  setAddrsObj(state => (state == null ? item : null))
                }}
              >
                {item.addrs_name}
              </AddresTabItem>
              <AddresTabWrapper open={addrsObj !== null}>
                <InputGruopGrid>
                  <SelectState
                    value={stateValue}
                    options={stateOptions}
                    styles={customSelectStyles}
                    placeholder="Selecione o estado"
                    onChange={option => setStateValue(option as ISelectOptions)}
                  />
                  <SelectState
                    value={cityValue}
                    options={cityOptions}
                    styles={customSelectStyles}
                    onChange={option => setCityValue(option as ISelectOptions)}
                    placeholder="Selecione o cidade"
                  />
                </InputGruopGrid>
                <InputGruopGrid>
                  <InputFC
                    type={'text'}
                    value={addrsZipCode}
                    setState={setAddrsZipCode}
                    placeholder={'CEP'}
                  />
                  <InputFC
                    type={'text'}
                    value={addrsDistrict}
                    setState={setAddrsDistrict}
                    placeholder={'Bairro'}
                  />
                </InputGruopGrid>
                <InputGruopGrid>
                  <InputFC
                    type={'text'}
                    value={addrsName}
                    setState={setAddrsName}
                    placeholder={'Logradouro'}
                  />
                  <InputFC
                    type={'number'}
                    value={addrsNumber}
                    setState={seAddrsNumber}
                    placeholder={'Número'}
                  />
                </InputGruopGrid>
              </AddresTabWrapper>
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
        <ButtonForm type="submit">Salver alterações</ButtonForm>
      </ModalForm>
    </Container>
  )
}

export default ModalUpdate
