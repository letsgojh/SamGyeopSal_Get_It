import {Router} from "express";
import { 
    showVenuesList,
    showDetailVenue,
    showVenuebyshow
} from "../controllers/venueController.js";
const router = Router();

router.get("/venues",showVenuesList);
router.get("/venues/:id",showDetailVenue);
router.get("/venues/:id/shows",showVenuebyshow);


export default router;