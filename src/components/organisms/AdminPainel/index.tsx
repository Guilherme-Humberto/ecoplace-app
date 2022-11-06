import React from 'react'
import PainelHeader from '@components/molecules/PainelHeader'
import PainelTitle from '@components/molecules/PainelTitle'
import { useAppContext } from '../../../context/AppContext'
import AdminPainelSec1FC from './Section1'
import { Container } from './styles'

const AdminPainel: React.FC = () => {
  const { userNameGlobalValue } = useAppContext()

  return (
    <>
      <PainelHeader />
      <Container>
        <PainelTitle
          title={`Olá ${userNameGlobalValue}`}
          subtitle={`Cadastre novos ítens e pontos de coleta`}
        />
        <AdminPainelSec1FC />
      </Container>
    </>
  )
}

export default AdminPainel
