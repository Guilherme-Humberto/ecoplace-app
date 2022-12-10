import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import InputFC from '@components/atoms/Input'
import { applicationApi } from '@api/index'
import {
  Container,
  Column,
  Constraint,
  SubTitle,
  Text,
  Title,
  Form,
  BtnForm,
  StatusMessage
} from './styles'
import { useAppContext } from 'context/AppContext'

const AdminLoginSec1FC: React.FC = () => {
  const router = useRouter()
  const { setUserNameGlobalValue } = useAppContext()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [statusMessage, setStatusMessage] = useState<string>(
    'Preencha as informações acima.'
  )

  const handleSignAdmin = async (event: FormEvent) => {
    event.preventDefault()

    applicationApi
      .post('/admin/login', { email, password })
      .then(response => {
        const user = response.data
        localStorage.setItem('user-name', user.data.name)
        setUserNameGlobalValue(user.data.name)

        router.push('/painel/admin')
      })
      .catch(error => {
        console.log(error)
        setStatusMessage('Erro ao acessar painel administrativo')
      })
  }

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
          <Text>Acesse o painel administrativo</Text>
          <Form onSubmit={handleSignAdmin}>
            <InputFC
              value={email}
              setState={setEmail}
              required
              type={'email'}
              placeholder="Informe seu email"
            />
            <InputFC
              value={password}
              setState={setPassword}
              required
              type={'password'}
              placeholder="Informe sua senha"
            />
            <BtnForm type="submit">Acessar minha conta</BtnForm>
          </Form>
          <StatusMessage>{statusMessage}</StatusMessage>
        </Column>
      </Constraint>
    </Container>
  )
}

export default AdminLoginSec1FC
