export function getRandomString() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .slice(2)
  )
}

export function handleError(err) {
  console.error(err)

  // TODO Ganti dengan alert modal.
  alert(err.message) // eslint-disable-line no-alert
}

export function acall(asyncFn) {
  asyncFn().catch(handleError)
}

export function computeTextColor(backgroundColorHex) {
  // https://github.com/twbs/bootstrap/blob/3bf08d87c9bedfe7cf4a0d52eb551d21755d9697/scss/_variables.scss
  const THRESHOLD = 150 / 255
  const COLOR_DARK = '#212529'
  const COLOR_LIGHT = '#fff'

  const [r, g, b] = /#(.{2})(.{2})(.{2})/g
    .exec(backgroundColorHex)
    .slice(1, 4)
    .map(hex => Number.parseInt(hex, 16) / 255)

  // https://github.com/twbs/bootstrap/blob/v4-dev/scss/_functions.scss
  const lum = (r * 299 + g * 587 + b * 114) / 1000

  return lum > THRESHOLD ? COLOR_DARK : COLOR_LIGHT
}
