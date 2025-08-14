import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from 'url';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8')
);

// router
import { routerHealth } from "./router/health.router.js";
import { routerAds } from "./router/ads.router.js";

const app = express();

// disable stuff
app.disable("x-powered-by");

// nginx stuff
if (process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

// helmet
app.use(helmet({
  contentSecurityPolicy: false
}));

// cors
const isProd = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);
app.use(cors({
  origin: isProd ? allowedOrigins : true,
  credentials: false,
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 204
}));

// logging
app.use(morgan(isProd ? "combined" : "dev"));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(compression());

// request id for better logging
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  next();
})

// routes
app.use("/health", routerHealth);
app.use("/api/ads", routerAds);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handling
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.originalUrl,
    requestId: req.id,
  });
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (!isProd) {
    console.error(`[${req.id}]`, err);
  }
  res.status(status).json({
    error: err.message || "Internal Server Error",
    code: err.code || "ERR_INTERNAL",
    requestId: req.id,
    ...(isProd ? {} : { stack: err.stack }),
  });
});
/* eslint-enable no-unused-vars */

export default app;