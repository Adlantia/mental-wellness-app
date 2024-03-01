
// declare a basePath for this router
import {Router} from "express";
import {signOutController} from "./sign-out.controller";

const basePath = '/api/sign-out'

const router = Router()

// define sign-out route for this router
router.route('/').get(signOutController)

// export the router with the basePath and router object
export const signOutRoute = { basePath, router }


