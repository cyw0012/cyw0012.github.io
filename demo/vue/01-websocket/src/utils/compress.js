// 压缩图片(base64,宽、高,图片质量)
const comCompress = function (base64String, w, quality) {
  const newImage = new Image()
  let imgWidth, imgHeight

  const promise = new Promise((resolve) => (newImage.onload = resolve))
  newImage.src = base64String
  return promise.then(() => {
    imgWidth = newImage.width
    imgHeight = newImage.height
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w
        canvas.height = (w * imgHeight) / imgWidth
      } else {
        canvas.height = w
        canvas.width = (w * imgWidth) / imgHeight
      }
    } else {
      canvas.width = imgWidth
      canvas.height = imgHeight
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height)
    const base64 = canvas.toDataURL('image/jpeg', quality)
    // console.log(base64)
    return base64
  })
}

// 获取 base64 图片大小（返回KB）
const getBaseSize = function (base64String) {
  const strLength = base64String.length
  const fileLength = parseInt(strLength - (strLength / 8) * 2)
  const size = (fileLength / 1024).toFixed(2)
  return parseInt(size)
}

export { comCompress, getBaseSize }
