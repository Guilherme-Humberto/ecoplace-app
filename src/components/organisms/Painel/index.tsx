import React, { useState } from 'react'
import { useAppContext } from 'context/AppContext'
import CollectionItemsFC from './CollectionItems'
import PainelHeader from '@components/molecules/PainelHeader'
import PainelTitle from '@components/molecules/PainelTitle'
import CollectionsCenterFC from './CollectionsCenter'
import { ICollectionItems } from '@interfaces/index'
import { Container } from './styles'

const PainelPageFC: React.FC = () => {
  const { userNameGlobalValue, stateGlobalValue, cityGlobalValue } = useAppContext()
  const [selectCollectionItem, setSelectCollectionItem] = useState<ICollectionItems[]>([])

  return (
    <>
      <PainelHeader />
      <Container>
        <PainelTitle
          title={`Olá ${userNameGlobalValue}`}
          subtitle={`Visualize os pontos de coleta próximos de ${stateGlobalValue.label}/${cityGlobalValue.label}`}
        />
        <CollectionItemsFC
          selectCollectionItem={selectCollectionItem}
          setSelectCollectionItem={setSelectCollectionItem}
        />
        <CollectionsCenterFC
          selectCollectionItem={selectCollectionItem}
          mesoRegionId={stateGlobalValue.value}
          microRegionId={cityGlobalValue.value}
        />
      </Container>
    </>
  )
}

export default PainelPageFC
