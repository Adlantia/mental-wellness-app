import {Router} from 'express'
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {getLogsByLogProfileIdController, postLogController} from "./log.controller";


// declare a basePath for this router
const basePath = '/apis/log'

// instantiate a new router object
const router = Router()

// define like route for this router
router.route('/')
    .post(isLoggedInController, postLogController)

//
router.route('/')
    .get(isLoggedInController, getLogsByLogProfileIdController)

// export the router with the basePath and router object
export const logRoute = {basePath, router}
