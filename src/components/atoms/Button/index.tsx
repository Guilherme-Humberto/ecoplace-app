import React from 'react';
import { Container } from './styles';

interface IButtonFc {
  event: any
}

const ButtonFC: React.FC<IButtonFc> = ({ event, children }) => {
  return <Container onClick={event}>{children}</Container>
}

export default ButtonFC;