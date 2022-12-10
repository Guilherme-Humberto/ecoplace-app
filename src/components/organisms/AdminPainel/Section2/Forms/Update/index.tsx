import React, { useState, useEffect, FormEvent } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import InputFC from '@components/atoms/Input'
import { applicationApi } from '@api/index'
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
  ModalForm
} from './styles'

interface IModalUpdate {
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

const ModalUpdate: React.FC<IModalUpdate> = ({
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
  const [addrsObj, setAddrsObj] = useState<IAddrsses | null>({} as IAddrsses)
  const [categoriesValues, setCategoriesValues] = useState<ISelectOptions[]>([])
  const [delCategoriesValues, setDelCategoriesValues] = useState<string[]>([])

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

    const formatedCategories = item.items.map(item => ({
      value: item.id,
      label: item.title
    }))

    setCategoriesValues(formatedCategories)
  }

  const updateZone = async (data: object) => {
    return await applicationApi.put(`/zone/update`, data, {
      params: { id: item?.id }
    })
  }

  const updateZoneAddrs = async (data: object) => {
    return await applicationApi.put(`/address/update`, data, {
      params: {
        addrs_id: addrsObj?.id,
        zone_id: item?.id
      }
    })
  }

  const updateZoneCategories = async (data: string[]) => {
    return await applicationApi.put(
      `/zone/category/update`,
      { data },
      {
        params: { id: item?.id }
      }
    )
  }

  const removeZoneCategories = async (data: string[]) => {
    return await applicationApi.put(
      `/zone/category/delete`,
      { data },
      {
        params: { id: item?.id }
      }
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()

      const zoneAddrsData = {
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

      await updateZone(collectionCenterData)

      if (addrsObj !== null) {
        await updateZoneAddrs(zoneAddrsData)
      }

      const aditionalItems: any = []

      categoriesValues.map((itemData, index) => {
        if (itemData.value !== item.items[index]?.id) {
          aditionalItems.push(categoriesValues[index].value)
        }
      })

      if (aditionalItems.length > 0) {
        await updateZoneCategories(aditionalItems)
      }

      if (delCategoriesValues.length > 0) {
        await removeZoneCategories(delCategoriesValues)
      }

      getZones()
      return setModalAction('')
    } catch (error) {
      console.log(error)
    }
  }

  const addCollectionsItem = (newItem: ISelectOptions) => {
    const itemAlreadyExists = categoriesValues.find(
      item => item.value == newItem.value
    )
    if (!itemAlreadyExists) {
      return setCategoriesValues(state => [...state, newItem])
    }
  }

  const removeCategories = (itemId: string) => {
    const filterItemsDifferents = categoriesValues.filter(
      item => item.value !== itemId
    )
    setDelCategoriesValues(state => [...state, itemId])
    return setCategoriesValues(filterItemsDifferents)
  }

  useEffect(() => {
    openModalUpdate()
  }, [item.id])

  return (
    <Container>
      <ModalForm onSubmit={handleSubmit}>
        <InputGroup>
          <strong>Dados</strong>
          <small>Edite as informações das zonas de coleta</small>
          <InputFC
            required
            type={'text'}
            value={image}
            setState={setImage}
            placeholder={'Imagem da zona de coleta'}
          />
          <InputFC
            required
            type={'text'}
            value={name}
            setState={setName}
            placeholder={'Nome da zona de coleta'}
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
          <small>Edite os endereços da zona de coleta</small>
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
            </AddresBlock>
          ))}
        </InputGroup>
        <InputGroup>
          <strong>Items de coleta</strong>
          <small>Remove o adicione novas categorias</small>
          <SelectState
            value={categoriesValues}
            options={categoriesOptions}
            styles={customSelectStyles}
            placeholder="Selecione a categoria"
            onChange={(option: any) => addCollectionsItem(option)}
          />
          <CategoriesList>
            {categoriesValues?.map(item => (
              <CategoryCard key={item.value}>
                <CategoryBtnRemove
                  onClick={() => removeCategories(String(item.value))}
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

export default ModalUpdate
