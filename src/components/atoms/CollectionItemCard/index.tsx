import React from 'react'
import Image from 'next/image'
import { Container, Title } from './styles'

interface ICollectionItem {
  id: string
  slug: string
  image: string
  title: string
  active?: boolean
}

const CollectionItemCard: React.FC<ICollectionItem> = ({
  id,
  image,
  slug,
  title,
  active
}) => {
  return (
    <Container active={active}>
      <Image src={image || ''} width={80} height={80} alt={slug} />
      <Title>{title}</Title>
    </Container>
  )
}

export default CollectionItemCard
