function buildResponse(status, message, data = {}) {
  return {
    status,
    message,
    data
  }
}

export {
  buildResponse
}