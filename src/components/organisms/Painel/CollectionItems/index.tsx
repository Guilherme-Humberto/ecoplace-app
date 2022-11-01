import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { applicationApi } from '@api/index'
import { Container, ItemCard, Title } from './styles'
import { ICollectionItems } from '@interfaces/index'

interface ICollectionItemsFcProps {
  setState: React.Dispatch<React.SetStateAction<ICollectionItems>>
}

const CollectionItemsFC: React.FC<ICollectionItemsFcProps> = ({ setState }) => {
  const [collectionItems, setCollectionItems] = useState<ICollectionItems[]>([])

  const getCollectionItems = async () => {
    const { data } = await applicationApi.get('/collectionItem/listAll')
    setCollectionItems(data)
  }

  useEffect(() => {
    getCollectionItems()
  }, [])

  return (
    <Container>
      {collectionItems.map(item => (
        <ItemCard key={item.slug} onClick={() => setState(item)}>
          <Image
            src={item.image || ''}
            width={80}
            height={80}
            alt={item.slug}
          />
          <Title>{item.title}</Title>
        </ItemCard>
      ))}
    </Container>
  )
}

export default CollectionItemsFC
