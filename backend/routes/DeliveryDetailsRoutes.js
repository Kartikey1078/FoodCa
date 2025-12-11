import express from "express"
import {createDelivery} from '../controllers/DeliveryDetails.js'
const router = express()

router.post("/",createDelivery)

export default router;


