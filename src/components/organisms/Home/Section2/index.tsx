import React from 'react'
import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'
import ButtonFC from '@components/atoms/Button'
import InputFC from '@components/atoms/Input'
import {
  Container,
  Column,
  Constraint,
  Text,
  Title,
  GitHubLink
} from './styles'

const HomeSec2FC: React.FC = () => {
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
            <Link href="/https://github.com/Guilherme-Humberto/ecoplace-app" passHref>
              <GitHubLink target="_blank">
                <FiGithub /> Visitar projeto
              </GitHubLink>
            </Link>
          </div>
          <div>
            <InputFC placeholder="Qual seu nome?" value="" />
            <InputFC placeholder="Qual seu email?" value="" />
            <ButtonFC>
              <p>{':)'} Quero ser um contribuidor</p>
            </ButtonFC>
          </div>
        </Column>
      </Constraint>
    </Container>
  )
}

export default HomeSec2FC
