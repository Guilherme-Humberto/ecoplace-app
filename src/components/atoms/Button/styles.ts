import styled, { css } from 'styled-components'

export const StyleButton = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 5px;
  font-weight: 500;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.green};
  }
`

export const ButtonDefaultWrapper = styled.div`
  margin-top: 10px;
  ${StyleButton};

  .text-with-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`

export const LoaderBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
export const Loader = styled.div`
  margin: auto;
  border: 2px solid ${props => props.theme.colors.gray};
  border-radius: 50%;
  border-top: 2px solid transparent;
  width: 20px;
  height: 20px;
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
