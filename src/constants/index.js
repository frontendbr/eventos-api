export function success (response, statusCode = 200) {
  return function (payload) {
    return response
      .status(statusCode)
      .json(payload)
  }
}
