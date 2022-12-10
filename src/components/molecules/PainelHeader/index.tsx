import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Logo, LinkBackToHome } from './styles'

const PainelHeader: React.FC = () => {
  return (
    <Container>
      <Logo>
        <Image src="/ecoplace-icon-dark.svg" width={150} height={80} />
      </Logo>
      <LinkBackToHome>
        <Link href="/" passHref>
          Voltar ao ínicio
        </Link>
      </LinkBackToHome>
    </Container>
  )
}

export default PainelHeader
