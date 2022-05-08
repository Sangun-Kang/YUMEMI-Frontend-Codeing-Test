import { GetPrefectures, GetPopulationComposition } from '../api/client'
import { useEffect, useState } from 'react'
import { PopulationComposition, PopulationCompositionDataDetail } from '../interfaces/interface'
import Chart from './Chart'
import './PrefList.css'

interface PrefResponse {
  prefCode: number
  prefName: string
}

interface PopulationCompositionResponse {
  boundaryYear: number
  data: PopulationCompositionDataDetail[]
}

const PrefList = () => {
  const [prefectures, setPrefectures] = useState<PrefResponse[]>([])
  const [selectPref, setSelectPref] = useState<PrefResponse[]>([])
  const [populationComposition, setPopulationComposition] = useState<PopulationComposition[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await GetPrefectures()
      setPrefectures(data.result)
    }
    getData()
  }, [])

  const handleCheck = async (
    event: React.MouseEvent<HTMLInputElement>,
    prefecture: PrefResponse,
  ) => {
    if (event.currentTarget.checked) {
      setSelectPref([...selectPref, prefecture])
      const result: PopulationCompositionResponse = (
        await GetPopulationComposition(prefecture.prefCode)
      ).result
      const pc: PopulationComposition = {
        prefName: prefecture.prefName,
        populationCompositionData: result.data,
      }
      setPopulationComposition([...populationComposition, pc])
    } else {
      setSelectPref(selectPref.filter((sp) => sp !== prefecture))
      setPopulationComposition(
        populationComposition.filter((pc) => pc.prefName !== prefecture.prefName),
      )
    }
  }

  return (
    <section>
      <article className="wrapper">
        {prefectures.map((prefecture) => (
          <span className="inner" key={prefecture.prefCode}>
            <input
              type="checkbox"
              name="pref"
              onClick={(e) => {
                handleCheck(e, prefecture)
              }}
            />
            <label>{prefecture.prefName}</label>
          </span>
        ))}
      </article>
      <article>
        <div>
          <Chart data={populationComposition} />
        </div>
      </article>
    </section>
  )
}

export default PrefList
