import React from 'react'
import ButtonFC from '@components/atoms/Button'
import InputFC from '@components/atoms/Input'
import { Container, Column, Constraint, Text, Title } from './styles'
import GitHubLink from '@components/atoms/GitHubLink'

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
            <GitHubLink />
          </div>
          <div>
            <InputFC
              placeholder="Qual seu nome?"
              value=""
              setState={() => {}}
            />
            <InputFC
              placeholder="Qual seu email?"
              value=""
              setState={() => {}}
            />
            <ButtonFC event={() => {}}>
              <p>{':)'} Quero ser um contribuidor</p>
            </ButtonFC>
          </div>
        </Column>
      </Constraint>
    </Container>
  )
}

export default HomeSec2FC
