function resolve(url, data) {
  return _resolve(url, data, false)
}

function resolveEncoded(url, data) {
  return _resolve(url, data, true)
}

function _resolve(url, data, encode = false) {
  return url.replace(/:([a-z]\w*)/gi, (keyParam, key) => {
    if (typeof data[key] === 'string' || typeof data[key] === 'number') {
      return encode
        ? encodeURIComponent(data[key])
        : data[key]
    }

    return keyParam
  })
}

module.exports = resolve