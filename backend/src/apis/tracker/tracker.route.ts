
import {Router} from "express";
import {getAllTrackers, getTrackersByTrackerIdController, postTrackerController} from "./tracker.controller";


// declare a basePath for this router
const basePath = '/apis/tracker'

// instantiate a new router object
const router = Router()

// define tracker route for this router
router.route('/')
    .post(postTrackerController)
    .get(getAllTrackers)

router.route('/trackerId').get(getTrackersByTrackerIdController)


export const trackerRoute = { basePath, router }
