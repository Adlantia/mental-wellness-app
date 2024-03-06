
import {Router} from "express";
import { getAllTrackers, getTrackerByTrackerIdController, postTrackerController } from "./tracker.controller";
import {isLoggedInController} from "../../utils/controllers/isLoggedInController";


// declare a basePath for this router
const basePath = '/apis/tracker'

// instantiate a new router object
const router = Router()


// define tracker route for this router
router.route('/')
    .post(isLoggedInController, postTrackerController)
    .get(getAllTrackers);

router.route('/trackerId')
    .get(getTrackerByTrackerIdController)


export const trackerRoute = { basePath, router }
