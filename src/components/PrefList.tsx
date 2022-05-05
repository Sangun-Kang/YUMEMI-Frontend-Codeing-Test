import { GetPrefectures, GetPopulationComposition } from '../api/client'
import { useEffect, useState } from 'react'
import './PrefList.css'

interface Pref {
  prefCode: string
  prefName: string
}

type PopulationComposition = {
  [index: string]: string
}

const PrefList = () => {
  const [prefectures, setPrefectures] = useState<Pref[]>([])
  const [selectPref, setSelectPref] = useState<Pref[]>([])
  const [populationComposition, setPopulationComposition] = useState<PopulationComposition>({})

  useEffect(() => {
    const getData = async () => {
      const data = await GetPrefectures()
      setPrefectures(data.result)
    }
    getData()
  }, [])

  const handleCheck = async (event: React.MouseEvent<HTMLInputElement>, prefecture: Pref) => {
    if (event.currentTarget.checked) {
      setSelectPref([...selectPref, prefecture])
      const data = await GetPopulationComposition(prefecture.prefCode)
      setPopulationComposition({ ...populationComposition, [prefecture.prefName]: data.result })
    } else {
      setSelectPref(selectPref.filter((sp) => sp !== prefecture))
      delete populationComposition[prefecture.prefName]
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
      <div>
        {selectPref.map((a) => (
          <div key={a.prefCode}>{a.prefName}</div>
        ))}
      </div>
      <hr />
      <div>
        {Object.keys(populationComposition).map((index) => (
          <div key={index}>{index}</div>
        ))}
      </div>
    </section>
  )
}

export default PrefList
