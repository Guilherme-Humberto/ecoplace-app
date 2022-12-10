import React, { useState } from 'react'
import { useAppContext } from 'context/AppContext'
import CategoryFC from './Categories'
import PainelHeader from '@components/molecules/PainelHeader'
import PainelTitle from '@components/molecules/PainelTitle'
import ZoneFC from './Zones'
import { ICategory } from '@interfaces/index'
import { Container } from './styles'

const PainelPageFC: React.FC = () => {
  const { userNameGlobalValue, stateGlobalValue, cityGlobalValue } =
    useAppContext()
  const [selectCategory, setSelectCategory] = useState<ICategory[]>([])

  return (
    <>
      <PainelHeader />
      <Container>
        <PainelTitle
          title={`Olá ${userNameGlobalValue}`}
          subtitle={`Visualize os pontos de coleta próximos de ${stateGlobalValue.label}/${cityGlobalValue.label}`}
        />
        <CategoryFC
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
        <ZoneFC
          selectCategory={selectCategory}
          mesoRegionId={stateGlobalValue.value as number}
          microRegionId={cityGlobalValue.value as number}
        />
      </Container>
    </>
  )
}

export default PainelPageFC
