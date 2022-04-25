import React from 'react'

type HogeProps = {
  name: string
}

const Hoge: React.FC<HogeProps> = ({ name }) => <div>Hello, {name}</div>

export default Hoge
