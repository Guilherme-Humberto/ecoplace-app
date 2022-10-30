import React from 'react'
import Image from 'next/image'
import { FiLogIn } from 'react-icons/fi'
import ButtonFC from '@components/atoms/Button'
import InputFC from '@components/atoms/Input'
import { Container, Column, Constraint, SubTitle, Title, Text } from './styles'

const HomeSec1FC: React.FC = () => {
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
          <InputFC placeholder="Qual seu nome?" value="" />
          <InputFC placeholder="Selecione a estado" value="" />
          <InputFC placeholder="Selecione a cidade" value="" />
          <ButtonFC>
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
