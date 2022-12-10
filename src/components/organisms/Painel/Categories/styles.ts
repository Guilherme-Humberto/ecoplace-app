import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px 0;
  max-width: 1400px;
`
