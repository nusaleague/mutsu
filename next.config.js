const crypto = require('crypto')
const fs = require('fs')
const dotenv = require('dotenv')
const withSharo = require('@tkesgar/sharo-next')

module.exports = withSharo({
  env: {
    BUILD_ID: crypto.randomBytes(8).toString('hex'),
    ...parse('default.env'),
    ...parse('.env')
  }
})

function parse(path) {
  return fs.existsSync(path) ? dotenv.parse(fs.readFileSync(path)) : {}
}
