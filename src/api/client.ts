const getClient = async (params: string) => {
  const url = `https://opendata.resas-portal.go.jp/api/v1/${params}`
  const header = new Headers({})
  header.append('X-API-KEY', 'A0WB4vp6eYWrVI2fXAHbpHSbaWs5ccaUCFyF6gg7')
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
