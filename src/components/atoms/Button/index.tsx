import React from 'react'
import { ButtonDefaultWrapper, LoaderBtn, Loader } from './styles'

interface IButtonFc {
  event: any
  isLoading?: boolean
}

const ButtonFC: React.FC<IButtonFc> = ({ event, isLoading, children }) => {
  return (
    <ButtonDefaultWrapper onClick={event}>
      {isLoading ? (
        <LoaderBtn>
          Carregando <Loader />
        </LoaderBtn>
      ) : (
        children
      )}
    </ButtonDefaultWrapper>
  )
}

export default ButtonFC
