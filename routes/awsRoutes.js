import express from "express"
import { getAws } from "../controllers/awsController"

const router = express.Router();

router.get("/", getAws)

export default router;