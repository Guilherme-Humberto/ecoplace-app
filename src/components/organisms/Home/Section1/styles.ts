import styled from 'styled-components'
import ReactSelect from 'react-select'

export const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: '45px',
    border: state.isFocused ? '2px solid #6C6C80' : '2px solid #F0F0F5',
    boxShadow: 'none',

    '&:hover': {
      borderColor: '#F0F0F5'
    }
  })
}

export const Container = styled.section`
  min-height: 100vh;
  background: url('/home/recycle-image.svg') top left no-repeat;

  display: grid;
  place-items: center;

  @media (max-width: 800px) {
    background-size: 50% 50%;
    background-position: -5% -15%;
  }
`

export const Constraint = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;

  display: grid;
  gap: 20px;
  grid-template-columns: 1.3fr 1fr;
  justify-items: center;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`

export const Column = styled.div`
  width: 100%;

  @media (max-width: 1000px) {
    max-width: 600px;
  }
`
export const Title = styled.h1`
  font-size: clamp(35px, 5vw, 54px);
  font-family: ${props => props.theme.fonts.secondary};
  margin: 24px 0 30px 0;
  max-width: 600px;
`
export const SubTitle = styled.h2`
  font-size: clamp(18px, 5vw, 24px);
  font-weight: 500;
  margin-top: 30px;
  font-family: ${props => props.theme.fonts.secondary};
`
export const Text = styled.p`
  color: ${props => props.theme.colors.tertiary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: clamp(16px, 5vw, 20px);
  letter-spacing: 5%;
  font-weight: lighter;
  max-width: 482px;
`
export const SelectState = styled(ReactSelect)`
  margin: 20px 0;
`
