import React, { FormEvent, useState } from 'react'
import InputFC from '@components/atoms/Input'
import { applicationApi } from '@api/index'
import {
  Container,
  Column,
  Constraint,
  Text,
  Title,
  StatusMessage,
  Form,
  ButtonForm
} from './styles'

const HomeSec2FC: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [statusMessage, setStatusMessage] = useState<string>(
    'Preencha as informações acima.'
  )

  const handleRegisterContributor = async (event: FormEvent) => {
    event.preventDefault()

    if (name == '' || email == '') {
      return alert('Preencha todas as informações')
    }
    applicationApi
      .post('/contributor/create', { name, email })
      .then(() => setStatusMessage('Oba, em breve entraremos em contato.'))
      .catch(() => setStatusMessage('Erro ao cadastrar suas informações'))

    setName('')
    setEmail('')
  }

  return (
    <Container>
      <Constraint>
        <Column>
          <Title>Quem somos</Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Column>
        <Column className="with-grid-columns">
          <div>
            <Title>Contribuir</Title>
            <Text className="contributor-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </div>
          <Form onSubmit={handleRegisterContributor}>
            <InputFC
              value={name}
              setState={setName}
              required
              type="text"
              placeholder="Qual seu nome?"
            />
            <InputFC
              value={email}
              setState={setEmail}
              required
              type="email"
              placeholder="Qual seu email?"
            />
            <ButtonForm type="submit">Quero ser um contribuidor</ButtonForm>
            {statusMessage !== '' && (
              <StatusMessage>{statusMessage}</StatusMessage>
            )}
          </Form>
        </Column>
      </Constraint>
    </Container>
  )
}

export default HomeSec2FC
