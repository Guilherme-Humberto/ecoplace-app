import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiLogIn } from 'react-icons/fi'
import ButtonFC from '@components/atoms/Button'
import InputFC from '@components/atoms/Input'
import { getMicroregions, getStates } from '@helpers/getRegions'
import { ISelectOptions } from '@interfaces/index'
import {
  Container,
  Column,
  Constraint,
  SubTitle,
  Title,
  Text,
  SelectState,
  customSelectStyles
} from './styles'
import { useAppContext } from 'context/AppContext'

const HomeSec1FC: React.FC = () => {
  const router = useRouter()

  const { setCityGlobalValue, setStateGlobalValue, setUserNameGlobalValue } =
    useAppContext()

  const [stateOptions, setStateOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [stateValue, setStateValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )
  const [cityValue, setCityValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )
  const [userName, setUserName] = useState('')

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

  const handleSubmit = () => {
    if (userName == '' || !cityValue.value || !stateValue.value) {
      return alert('Dados incompletos')
    }

    localStorage.setItem('user-name', userName)
    localStorage.setItem('region-state', JSON.stringify(stateValue))
    localStorage.setItem('region-city', JSON.stringify(cityValue))

    setUserNameGlobalValue(userName)
    setStateGlobalValue(stateValue)
    setCityGlobalValue(cityValue)

    return router.push('/painel')
  }

  useEffect(() => {
    getStateOptions()
  }, [])

  useEffect(() => {
    getCityOptions()
  }, [stateValue?.value])

  return (
    <Container>
      <Constraint>
        <Column>
          <Image src="/ecoplace-icon-dark.svg" width={150} height={50} />
          <SubTitle>Ola, bem vindo ao EcoPlace</SubTitle>
          <Title>Seu marketplace de coleta de resíduos.</Title>
          <Text>
            Ajudamos milhares de pessoal a encontrar pontos de coleta de forma
            eficiente.
          </Text>
        </Column>
        <Column>
          <InputFC
            value={userName}
            setState={setUserName}
            placeholder="Qual seu nome?"
          />
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
          <ButtonFC event={handleSubmit}>
            <p className="text-with-icon">
              <FiLogIn size={30} /> Acessar o EcoPlace
            </p>
          </ButtonFC>
        </Column>
      </Constraint>
    </Container>
  )
}

export default HomeSec1FC
