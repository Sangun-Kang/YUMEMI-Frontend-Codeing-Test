const getClient = async (params: string) => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/${params}`
  const header = new Headers({})
  header.append('X-API-KEY', process.env.REACT_APP_RESAS_API_KEY || '')
  const opt: RequestInit = {
    method: 'GET',
    headers: header,
  }
  return await fetch(url, opt)
    .then((response) => response.json())
    .catch((error) => {
      return error
    })
}

export const GetPrefectures = async () => await getClient('prefectures')
export const GetPopulationComposition = async (prefCode: string) =>
  await getClient(`population/composition/perYear?cityCode=-&prefCode=${prefCode}`)
