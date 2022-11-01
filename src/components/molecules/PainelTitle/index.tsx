import React from 'react'
import { Container, Title, SubTitle } from './styles'

interface IPainelTitle {
  title: string
  subtitle: string
}

const PainelTitle: React.FC<IPainelTitle> = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Container>
  )
}

export default PainelTitle
