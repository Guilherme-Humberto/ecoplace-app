import styled from 'styled-components'
import ReactSelect from "react-select";

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
  font-weight: 500;
  margin-top: 30px;
  font-family: ${props => props.theme.fonts.secondary};
`
export const Text = styled.p`
  color: ${props => props.theme.colors.tertiary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 20px;
  letter-spacing: 5%;
  font-weight: lighter;
  max-width: 482px;
`
export const SelectState = styled(ReactSelect)`
  margin: 20px 0;
`