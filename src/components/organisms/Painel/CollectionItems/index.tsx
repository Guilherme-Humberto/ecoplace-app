import React, { useEffect, useState } from 'react'
import { applicationApi } from '@api/index'
import { ICollectionItems } from '@interfaces/index'
import CollectionItemCard from '@components/atoms/CollectionItemCard'
import { Container } from './styles'

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
        <div key={item.slug} onClick={() => addCollectionItem(item)}>
          <CollectionItemCard
            id={item.id}
            slug={item.slug}
            image={item.image}
            title={item.title}
            active={
              !!selectCollectionItem?.find(element => element.id == item.id)
            }
          />
        </div>
      ))}
    </Container>
  )
}

export default CollectionItemsFC
