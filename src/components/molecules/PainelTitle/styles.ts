import styled from 'styled-components'

export const Container = styled.div`
`

export const Title = styled.h1`
  font-size: 31px;
  font-weight: 500;
`
export const SubTitle = styled.h2`
  font-weight: 300;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 20px;
  color: ${props => props.theme.colors.gray2};
  margin-top: 10px;
`
