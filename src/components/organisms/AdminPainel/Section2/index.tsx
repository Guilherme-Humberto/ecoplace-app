import React, { useState, useEffect } from 'react'
import { applicationApi } from '@api/index'
import { ICollectionsCenter, ISelectOptions } from '@interfaces/index'
import Modal from '@components/molecules/Modal'
import { ModalSubTitle, ModalTitle } from '@components/molecules/Modal/styles'
import { getMicroregions, getStates } from '@helpers/getRegions'
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
  customSelectStyles
} from './styles'
import InputFC from '@components/atoms/Input'

const AdminPainelSec2FC: React.FC = () => {
  const [modalAction, setModalAction] = useState<string>('')
  const [collectionsCenter, setCollectionsCenter] = useState<ICollectionsCenter[]>([])
  const [collectionCenter, setCollectionCenter] = useState<ICollectionsCenter | null>(null)
  const [stateOptions, setStateOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])

  const [stateValue, setStateValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )
  const [cityValue, setCityValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )


  const getCollectionsCenter = async () => {
    const { data: collectionsCenter } = await applicationApi.get(
      `/collectionCenter/listAll`
    )
    return setCollectionsCenter(collectionsCenter)
  }

  const getStateOptions = async () => {
    const dataState = await getStates()
    return setStateOptions(dataState)
  }

  const getCityOptions = async () => {
    setCityOptions([])
    setCityValue({} as ISelectOptions)
    const dataCity = await getMicroregions(Number(stateValue.value))
    return setCityOptions(dataCity)
  }

  useEffect(() => {
    getCollectionsCenter()
    getStateOptions()
  }, [])

  useEffect(() => {
    getCityOptions()
  }, [stateValue?.value])

  return (
    <>
      <Container>
        <Constraint>
          <Column>
            <Title>Pontos de coleta</Title>
          </Column>
          <Column>
            <ListOfCollections>
              {collectionsCenter.map((item, index) => (
                <CollectionCenterCard
                  key={index}
                  onClick={() => {
                    setCollectionCenter(item)
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
      {collectionCenter && modalAction == 'update' && (
        <Modal
          minWidth={'800px'}
          maxWidth={'800px'}
          withScroll
          event={() => setCollectionCenter(null)}
        >
          <ModalTitles>
            <ModalTitle>Atualizar ponto de coleta</ModalTitle>
            <ModalSubTitle>Atualizar ponto de coleta</ModalSubTitle>
          </ModalTitles>

          <ModalForm>
            <InputFC
              required
              type={'text'}
              value={''}
              setState={() => {}}
              placeholder={'Imagem do item'}
            />

            <InputGroup>
              <strong>Dados</strong>
              <InputFC
                required
                type={'text'}
                value={''}
                setState={() => {}}
                placeholder={'Nome da entidade'}
              />
              <InputGruopGrid>
                <InputFC
                  required
                  type={'email'}
                  value={''}
                  setState={() => {}}
                  placeholder={'E-mail'}
                />
                <InputFC
                  required
                  type={'text'}
                  value={''}
                  setState={() => {}}
                  placeholder={'Whatsapp'}
                />
              </InputGruopGrid>
            </InputGroup>
            <InputGroup>
              <strong>Endereço</strong>
              <InputGruopGrid>
              <SelectState
                value={stateValue.value ? stateValue : null}
                options={stateOptions}
                styles={customSelectStyles}
                placeholder="Selecione o estado"
                onChange={option => setStateValue(option as ISelectOptions)}
                isLoading={stateOptions.length == 0}
                isDisabled={stateOptions.length == 0}
              />
              {stateValue.value && (
                <SelectState
                  value={cityValue.value ? cityValue : null}
                  options={cityOptions}
                  styles={customSelectStyles}
                  onChange={option => setCityValue(option as ISelectOptions)}
                  placeholder="Selecione o cidade"
                />
              )}
              </InputGruopGrid>
              <InputFC
                required
                type={'text'}
                value={''}
                setState={() => {}}
                placeholder={'CEP'}
              />
              <InputGruopGrid>
                <InputFC
                  required
                  type={'email'}
                  value={''}
                  setState={() => {}}
                  placeholder={'Logradouro'}
                />
                <InputFC
                  required
                  type={'text'}
                  value={''}
                  setState={() => {}}
                  placeholder={'Número'}
                />
              </InputGruopGrid>
            </InputGroup>
          </ModalForm>
        </Modal>
      )}
    </>
  )
}

export default AdminPainelSec2FC
