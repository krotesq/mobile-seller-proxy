import { Router } from "express";
import { controllerGetHealth } from "../controller/health.controller.js";

const routerHealth = Router();

routerHealth.get("/", controllerGetHealth);

export {
  routerHealth
} 
