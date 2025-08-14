import { buildResponse } from "../util/response.js"

// get all ads
async function controllerGetAds(req, res) {

  const headers = {
    "Accept": "application/vnd.de.mobile.api+json",
    "Authorization": "Basic " + Buffer.from(`${process.env.MOBILE_USERNAME}:${process.env.MOBILE_PASSWORD}`).toString("base64")
  };
  const sellerId = process.env.SELLER_ID;
  const url = `https://services.mobile.de/seller-api/sellers/${sellerId}/ads`;
  const response = await fetch(url, { headers })
  const json = await response.json();
  if (!response.status === 200) {
    return res.status(response.status).json(buildResponse(response.status, response.statusText))
  }
  return res.status(200).json(buildResponse(res.status, "All available ads", {...json}))

}

// get specific ad by id
async function controllerGetAd(req, res) {

  const headers = {
    "Accept": "application/vnd.de.mobile.api+json",
    "Authorization": "Basic " + Buffer.from(`${process.env.MOBILE_USERNAME}:${process.env.MOBILE_PASSWORD}`).toString("base64")
  };
  const sellerId = process.env.SELLER_ID;
  const url = `https://services.mobile.de/seller-api/sellers/${sellerId}/ads/${req.params.id}`;
  const response = await fetch(url, { headers })
  const json = await response.json();
  if (!response.status === 200) {
    return res.status(response.status).json(buildResponse(response.status, response.statusText))
  }
  return res.status(200).json(buildResponse(res.status, "Ad found", {...json}))

}

export {
  controllerGetAds,
  controllerGetAd
}