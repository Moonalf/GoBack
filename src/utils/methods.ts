export const getYear = (index: number) => {
  const begin = index + 2015
  const end = index + 2016
  return begin + '-' + end
}

export const getIdx = (index: number) => {
  if (index >= 11 && index <= 19) {
    return index.toString() + 'th'
  }
  if (index.toString().endsWith('1')) {
    return index.toString() + 'st'
  }
  if (index.toString().endsWith('2')) {
    return index.toString() + 'nd'
  }
  if (index.toString().endsWith('3')) {
    return index.toString() + 'rd'
  }
  return index.toString() + 'th'
}

export const devideArr = (arr: any[], col: number) => {
  if (col === 0 || col === 1) {
    return [arr]
  }
  let res = [] as any
  let row = Math.ceil(arr.length / col)
  for (let i = 0; i < row; i++) {
    res.push([])
  }
  arr.forEach((item, index) => {
    // console.log(Math.floor(index / col))
    res[Math.floor(index / col)].push(item)
  })
  return res
}
