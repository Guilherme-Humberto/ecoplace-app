import React from 'react'
import HomeSec1FC from './Section1'
import HomeSec2FC from './Section2'
import { Main } from './styles'

const HomePageFC: React.FC = () => {
  return (
    <Main>
      <HomeSec1FC />
      <HomeSec2FC />
    </Main>
  )
}

export default HomePageFC
