import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { applicationApi } from '@api/index'
import { Container, ItemCard, Title } from './styles'
import { ICollectionItems } from '@interfaces/index'

interface ICollectionItemsFcProps {
  selectCollectionItem: ICollectionItems[]
  setSelectCollectionItem: React.Dispatch<
    React.SetStateAction<ICollectionItems[]>
  >
}

const CollectionItemsFC: React.FC<ICollectionItemsFcProps> = ({
  selectCollectionItem,
  setSelectCollectionItem
}) => {
  const [collectionItems, setCollectionItems] = useState<ICollectionItems[]>([])

  const getCollectionItems = async () => {
    const { data: collectionItems } = await applicationApi.get('/collectionItem/listAll')
    return setCollectionItems(collectionItems)
  }

  const addCollectionItem = (item: ICollectionItems) => {
    const filterItem = selectCollectionItem.filter(element => element.id == item.id)
    const removeItem = selectCollectionItem.filter(element => element.id !== item.id)

    if (filterItem.length == 0) {
      return setSelectCollectionItem(prev => [...prev, item])
    }

    return setSelectCollectionItem(removeItem)
  }

  useEffect(() => {
    getCollectionItems()
  }, [])

  return (
    <Container>
      {collectionItems.map(item => (
        <ItemCard
          key={item.slug}
          onClick={() => addCollectionItem(item)}
          active={!!selectCollectionItem?.find(element => element.id == item.id)}
        >
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
