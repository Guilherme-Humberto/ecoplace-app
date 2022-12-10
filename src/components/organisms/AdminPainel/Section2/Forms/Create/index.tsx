import React, { useState, FormEvent } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import InputFC from '@components/atoms/Input'
import { applicationApi } from '@api/index'
import { generateUUID } from '@helpers/generateUUID'
import { IAddrsses, IZone, ISelectOptions } from '@interfaces/index'
import {
  Container,
  InputGroup,
  InputGroupGrid,
  SelectState,
  customSelectStyles,
  AddresBlock,
  AddresTabWrapper,
  AddresTabItem,
  CategoriesList,
  CategoryCard,
  CategoryBtnRemove,
  ButtonForm,
  ModalForm,
  BtnAddAddress,
  BtnSaveAddrsInList
} from './styles'

interface IModalCreate {
  item: IZone
  stateValue: ISelectOptions
  stateOptions: ISelectOptions[]
  cityValue: ISelectOptions
  cityOptions: ISelectOptions[]
  categoriesOptions: any[]
  getZones: () => void
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
  getZones,
  setModalAction,
  categoriesOptions
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
  const [zonesValues, setZonesValues] = useState<ISelectOptions[]>([])
  const [delZonesValues, setDelZonesValues] = useState<string[]>([])

  const openTabAddrsItem = () => {
    setAddrsObj({} as IAddrsses)
  }

  const createZones = async (data: object) => {
    return await applicationApi.post(`/zone/create`, data)
  }

  const createAddrs = async (data: IAddrsses) => {
    return await applicationApi.post(`/address/create`, data, {
      params: {
        mesoregion_id: stateValue.value,
        microregion_id: cityValue.value
      }
    })
  }
  const createZonesAddrs = async (data: object) => {
    return await applicationApi.post(`/zone/addrs/create`, data)
  }

  const createZonesCategories = async (data: object) => {
    return await applicationApi.post(`/zone/category/create`, data)
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

      await createZones(collectionCenterData)

      const registerAddrs = addrsObjArray.map(async item => {
        const addrsId = generateUUID()
        await createAddrs({ id: addrsId, ...item })

        await createZonesAddrs({
          mesoregion_id: stateValue.value,
          microregion_id: cityValue.value,
          zone_id: uuIdCollectionCenter,
          addrs_id: addrsId
        })
      })

      const registerCollectionItems = zonesValues.map(async item => {
        await createZonesCategories({
          zone_id: uuIdCollectionCenter,
          category_id: item.value
        })
      })

      await Promise.all(registerAddrs)
      await Promise.all(registerCollectionItems)

      getZones()
      return setModalAction('')
    } catch (error) {
      console.log(error)
    }
  }

  const addZoneCategorieInList = (newItem: ISelectOptions) => {
    const itemAlreadyExists = zonesValues.find(
      item => item.value == newItem.value
    )
    if (!itemAlreadyExists) {
      return setZonesValues(state => [...state, newItem])
    }
  }

  const removeZoneCategory = (itemId: string) => {
    const filterItemsDifferents = zonesValues.filter(
      item => item.value !== itemId
    )
    setDelZonesValues(state => [...state, itemId])
    return setZonesValues(filterItemsDifferents)
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
          <small>Edite as informações do zona de coleta</small>
          <InputFC
            required
            type={'text'}
            value={image}
            setState={setImage}
            placeholder={'Imagem do zona de coleta'}
          />
          <InputFC
            required
            type={'text'}
            value={name}
            setState={setName}
            placeholder={'Nome do zona de coleta'}
          />
          <InputFC
            required
            type={'text'}
            value={description}
            setState={setDescription}
            placeholder={'Descrição'}
          />
          <InputGroupGrid>
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
          </InputGroupGrid>
        </InputGroup>
        <InputGroup>
          <strong>Endereço</strong>
          <small>Edite os endereços do zona de coleta</small>
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
            <BtnAddAddress type="button" onClick={openTabAddrsItem}>
              Adicionar endereço
            </BtnAddAddress>
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
                <InputGroupGrid>
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
                </InputGroupGrid>
                <InputGroupGrid>
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
                </InputGroupGrid>
                <InputGroupGrid>
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
                </InputGroupGrid>
              </AddresTabWrapper>
              <BtnSaveAddrsInList type="button" onClick={addAddresses}>
                Salvar endereço
              </BtnSaveAddrsInList>
            </AddresBlock>
          )}
        </InputGroup>
        <InputGroup>
          <strong>Items de coleta</strong>
          <small>Remove o adicione novas categorias</small>
          <SelectState
            value={zonesValues}
            options={categoriesOptions}
            styles={customSelectStyles}
            placeholder="Selecione a categoria"
            onChange={(option: any) => addZoneCategorieInList(option)}
          />
          <CategoriesList>
            {zonesValues?.map(item => (
              <CategoryCard key={item.value}>
                <CategoryBtnRemove
                  onClick={() => removeZoneCategory(String(item.value))}
                >
                  <AiOutlineClose size={13} />
                </CategoryBtnRemove>
                <small>{item.label}</small>
              </CategoryCard>
            ))}
          </CategoriesList>
        </InputGroup>
        <ButtonForm type="submit">Salver alterações</ButtonForm>
      </ModalForm>
    </Container>
  )
}

export default ModalCreate
