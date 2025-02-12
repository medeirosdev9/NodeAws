import express from "express";
import { getAws } from "../controllers/awsController";

const awsRoutes = require('../controllers/awsController');

const router = express.Router();

router.get("/", awsRoutes.buscarImagem );

export default router