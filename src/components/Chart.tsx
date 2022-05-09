import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { PopulationComposition } from '../interfaces/interface'
import './Chart.css'

interface PropsData {
  data: PopulationComposition[]
}

const Chart = (props: PropsData) => {
  const [age, setAge] = useState('総人口')
  const data = props.data

  return (
    <div className="wrapper">
      <div className="ageBox">
        <fieldset>
          <legend>詳細分類</legend>
          <div>現在値 : {age}</div>
          <div>
            <input
              name="age"
              type="radio"
              value="総人口"
              onChange={(e) => setAge(e.target.value)}
            />
            <label>総人口</label>
            <input
              name="age"
              type="radio"
              value="年少人口"
              onChange={(e) => setAge(e.target.value)}
            />
            <label>年少人口</label>
            <input
              name="age"
              type="radio"
              value="生産年齢人口"
              onChange={(e) => setAge(e.target.value)}
            />
            <label>生産年齢人口</label>
            <input
              name="age"
              type="radio"
              value="老年人口"
              onChange={(e) => setAge(e.target.value)}
            />
            <label>老年人口</label>
          </div>
        </fieldset>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" type="category" allowDuplicatedCategory={false} />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend />
          {data.map((s) => (
            <Line
              dataKey="value"
              data={s.populationCompositionData.find((pc) => pc.label === age)?.data}
              name={s.prefName}
              key={s.prefName}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
