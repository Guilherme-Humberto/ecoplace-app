import styled from 'styled-components'
import { StyleButton } from '@components/atoms/Button/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export const Constraint = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  padding: 0 20px;
`

export const Column = styled.div`
  width: 100%;
  margin: 0 auto;

  &.with-grid-columns {
    display: grid;
    gap: 10px;
    grid-template-columns: 1.5fr 1fr;
    margin-top: 50px;
  }

  @media (max-width: 1000px) {
    max-width: 600px;
    &.with-grid-columns {
      grid-template-columns: 1fr;
    }
  }
`
export const Title = styled.h3`
  font-size: clamp(28px, 5vw, 34px);
  font-weight: bold;
  font-family: ${props => props.theme.fonts.secondary};
  margin-bottom: 10px;
`
export const Text = styled.p`
  font-size: clamp(16px, 5vw, 18px);
  font-weight: lighter;
  color: ${props => props.theme.colors.tertiary};
  font-family: ${props => props.theme.fonts.primary};

  &.contributor-text {
    max-width: 80%;
  }

  @media (max-width: 1000px) {
    &.contributor-text {
      max-width: 100%;
    }
  }
`
export const Form = styled.form``
export const ButtonForm = styled.button`
  ${StyleButton}
  outline: none;
  border: none;
`
export const StatusMessage = styled.small`
  display: flex;
  margin-top: 10px;
`
