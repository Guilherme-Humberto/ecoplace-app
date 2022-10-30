import styled from 'styled-components'

export const Container = styled.section`
  min-height: 100vh;
  background: url('/home/recycle-image.svg') top left no-repeat;

  display: grid;
  place-items: center;
`

export const Constraint = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`

export const Column = styled.div`
  width: 100%;
`
export const Title = styled.h1`
  font-size: 54px;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 24px 0 30px 0;
`
export const SubTitle = styled.h2`
  font-size: 24px;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: 500;
  margin-top: 30px;
`
export const Text = styled.p`
  color: ${props => props.theme.colors.tertiary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 20px;
  letter-spacing: 5%;
  font-weight: lighter;
  max-width: 482px;
`
