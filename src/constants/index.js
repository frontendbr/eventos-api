export function success (response, statusCode = 200) {
  return function (payload) {
    return response
      .status(statusCode)
      .json(payload)
  }
}

export function error (response, statusCode = 500) {
  return function (payload) {
    return response
      .status(statusCode)
      .json(payload)
  }
}
