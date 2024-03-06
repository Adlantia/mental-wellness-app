import {Router} from 'express'
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";
import {postLogController} from "./log.controller";


// declare a basePath for this router
const basePath = '/apis/log'

// instantiate a new router object
const router = Router()

// define like route for this router
router.route('/')
    .post(isLoggedInController, postLogController)

// define log route for this router
// router.route('/toggle')
//     .post(isLoggedInController, logController)
//
// // define log route for this router
// router.route('/logThreadId/:logThreadId')
//     .get(getLogsByLogThreadIdController)
//     .delete(isLoggedInController, deleteLogController)
//
// router.route('/profileId/:profileId')
//     .get(getLogsByLogProfileIdController)

// export the router with the basePath and router object
export const logRoute = {basePath, router}