import React, { useState, FormEvent } from 'react'
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
import { generateUUID } from '@helpers/generateUUID'

interface IModalCreate {
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

const ModalCreate: React.FC<IModalCreate> = ({
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
  const [addrsObj, setAddrsObj] = useState<IAddrsses | null>(null)
  const [addrsObjArray, setAddrsObjArray] = useState<any[]>([])
  const [collectionItemValues, setCollectionItemValues] = useState<
    ISelectOptions[]
  >([])
  const [delCollectionItemValues, setDelCollectionItemValues] = useState<
    string[]
  >([])

  const openTabAddrsItem = () => {
    setAddrsObj({} as IAddrsses)
  }

  const createCollectionCenter = async (data: object) => {
    return await applicationApi.post(`/collectionCenter/create`, data)
  }

  const createCollectionAddrs = async (data: IAddrsses) => {
    return await applicationApi.post(`/collectionAddrs/create`, data, {
      params: {
        mesoregion_id: stateValue.value,
        microregion_id: cityValue.value
      }
    })
  }
  const createCollectionCenterAddrs = async (data: object) => {
    return await applicationApi.post(`/collectionCenter/addrs/create`, data)
  }

  const createCollectionCenterItems = async (data: object) => {
    return await applicationApi.post(`/collectionCenter/items/create`, data)
  }

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      const uuIdCollectionCenter = generateUUID()

      const collectionCenterData = {
        id: uuIdCollectionCenter,
        name,
        image,
        email,
        phone,
        description
      }

      await createCollectionCenter(collectionCenterData)

      const registerAddrs = addrsObjArray.map(async item => {
        const addrsId = generateUUID()
        await createCollectionAddrs({ id: addrsId, ...item })

        await createCollectionCenterAddrs({
          mesoregion_id: stateValue.value,
          microregion_id: cityValue.value,
          collection_center_id: uuIdCollectionCenter,
          collection_addrs_id: addrsId
        })
      })

      const registerCollectionItems = collectionItemValues.map(async item => {
        await createCollectionCenterItems({
          collection_center_id: uuIdCollectionCenter,
          collection_item_id: item.value
        })
      })

      await Promise.all(registerAddrs)
      await Promise.all(registerCollectionItems)

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

  const addAddresses = () => {
    const data = {
      addrs_name: addrsName,
      zip_code: addrsZipCode,
      district: addrsDistrict,
      addrs_number: addrsNumber,
      mesoregion_id: stateValue.value,
      microregion_id: cityValue.value
    }

    setAddrsObjArray(state => [...state, data])

    setAddrsName('')
    seAddrsNumber(0)
    setAddrsZipCode('')
    setAddrsDistrict('')
    setAddrsObj(null)
  }

  const removeAddresses = (indexValue: number) => {
    const filterAddrss = addrsObjArray.filter(
      (_item, index) => index !== indexValue
    )
    return setAddrsObjArray(filterAddrss)
  }

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
          {addrsObjArray.map((item, index) => (
            <AddresTabItem
              key={index}
              open={!item.addrs_name}
              onClick={() => setAddrsObj(null)}
            >
              {item.addrs_name}
              <div onClick={() => removeAddresses(index)}>
                <AiOutlineClose size={13} />
              </div>
            </AddresTabItem>
          ))}
          {addrsObj == null && (
            <button type="button" onClick={openTabAddrsItem}>
              Adicionar endereço
            </button>
          )}
          {addrsObj !== null && (
            <AddresBlock>
              <AddresTabItem
                open={addrsObj !== null}
                onClick={() => setAddrsObj(null)}
              >
                Novo endereço
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
              <button type="button" onClick={addAddresses}>
                Salvar endereço
              </button>
            </AddresBlock>
          )}
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

export default ModalCreate
