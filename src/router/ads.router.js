import { Router } from "express";
import { controllerGetAds, controllerGetAd } from "../controller/ads.controller.js";

const routerAds = Router();

routerAds.get("/", controllerGetAds);
routerAds.get("/:id", controllerGetAd);

export {
  routerAds
}