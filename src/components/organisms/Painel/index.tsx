import React, { useState } from 'react'
import { useAppContext } from 'context/AppContext'
import CollectionItemsFC from './CollectionItems'
import PainelHeader from '@components/molecules/PainelHeader'
import PainelTitle from '@components/molecules/PainelTitle'
import { Container } from './styles'
import { ICollectionItems } from '@interfaces/index'
import CollectionsCenterFC from './CollectionsCenter'

const PainelPageFC: React.FC = () => {
  const { userNameGlobalValue } = useAppContext()
  const [collectionItem, setCollectionItem] = useState<ICollectionItems>({} as ICollectionItems)

  return (
    <>
      <PainelHeader />
      <Container>
        <PainelTitle
          title={`Olá ${userNameGlobalValue}`}
          subtitle={'Estes são os pontos de coleta próximos da sua região.'}
        />
        <CollectionItemsFC setState={setCollectionItem} />
        <CollectionsCenterFC />
      </Container>
    </>
  )
}

export default PainelPageFC
