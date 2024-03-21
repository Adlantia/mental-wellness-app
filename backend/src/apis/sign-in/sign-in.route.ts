import {Router} from "express";
import {signInController} from "./sign-in-controller";

//declare basePath for this router
const basePath = '/apis/sign-in'

//instantiate new router object
const router = Router()

//define (signup) route for this router
router.route('/').post(signInController)

//export the router with basePath and router object
export const signInRoute = {basePath, router}