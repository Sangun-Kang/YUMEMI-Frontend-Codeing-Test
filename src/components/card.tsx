import { GetPrefectures } from '../api/client'
import { useEffect, useState } from 'react'

type CardProps = {
  title: string
  paragraph: string
}

interface Pref {
  prefCode: number
  prefName: string
}

const Card = ({ title, paragraph }: CardProps) => {
  const [prefectures, setPrefectures] = useState<Pref[]>([])
  useEffect(() => {
    const getData = async () => {
      const data = await GetPrefectures()
      setPrefectures(data.result)
    }
    getData()
  }, [])
  return (
    <aside>
      <h2>{title}~!!</h2>
      <p>{paragraph}</p>
      {prefectures.map((prefecture) => (
        <p key={prefecture.prefCode}>{prefecture.prefName}</p>
      ))}
    </aside>
  )
}

export default Card
