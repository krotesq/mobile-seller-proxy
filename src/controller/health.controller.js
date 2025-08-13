import { buildResponse } from "../util/response.js";

function controllerGetHealth(req, res) {
  return res.status(200).json(buildResponse(
    200,
    "Service is healthy",
    {
      uptime: process.uptime()
    }
  ))
}

export {
  controllerGetHealth
}