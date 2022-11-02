import ButtonFC from '@components/atoms/Button'
import React from 'react'
import { Container, Title, SubTitle, SupportContactBtn } from './styles'

const NotFoundMessage: React.FC = () => {
  return (
    <Container>
      <Title>Nenhum ponto de coleta encontrado</Title>
      <SubTitle>
        Volte para a tela inicial e procure em outra região ou entre em contato
        com nossa equipe
      </SubTitle>
      <SupportContactBtn>
        <ButtonFC event={() => {}}>
          <p>Entrar em contato</p>
        </ButtonFC>
      </SupportContactBtn>
    </Container>
  )
}

export default NotFoundMessage
