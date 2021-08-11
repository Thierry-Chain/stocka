const getEndPoint = () => {
  const DB_URI =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_URL
      : process.env.REACT_APP_DEV_URL
  return DB_URI
}
const numberSpacer = (num) => {
  let init = ''
  num = Math.round(num)
  num = String(num)

  for (const key in num) {
    if ((num.length - key - 1) % 3 === 2 && key > 0) {
      init = `${init},`
    }
    init = `${init}${num[key]}`
  }
  return `${init} Rwf`
}
const calcTotal = (arr) => {
  let tot = 0
  arr.map((data) => {
    return (tot += data.buyingPrice)
  })
  return tot
}
//sellingPrice
const calcTotalSellingPrc = (arr) => {
  let tot = 0
  arr.map((data) => {
    return (tot += data.sellingPrice)
  })
  return tot
}
export { getEndPoint, numberSpacer, calcTotal, calcTotalSellingPrc }
