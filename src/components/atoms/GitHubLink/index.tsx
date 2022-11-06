import React from 'react'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'
import { Container } from './styles'

const GitHubLink: React.FC = () => {
  return (
    <Link href="https://github.com/Guilherme-Humberto/ecoplace-app" passHref>
      <Container target="_blank">
        <FiGithub /> Repositório
      </Container>
    </Link>
  )
}

export default GitHubLink
