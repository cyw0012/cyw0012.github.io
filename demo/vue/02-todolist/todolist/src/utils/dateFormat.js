function dateFormat(vl) {
  let date = new Date(vl)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month + 1 < 10 ? '0' + month : month
  let day = date.getDate()
  day = day < 10 ? '0' + day : day
  let hh = date.getHours()
  hh = hh < 10 ? '0' + hh : hh
  let mm = date.getMinutes()
  mm = mm < 10 ? '0' + mm : mm
  let ss = date.getSeconds()
  ss = ss < 10 ? '0' + ss : ss

  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
}

export default dateFormat
