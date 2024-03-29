import { Router } from "express"
import { isLoggedInController } from "../../utils/controllers/isLoggedIn.controller"
import { putProfileController } from "./profile.controller"


const basePath = '/apis/profile' 

const router: Router = Router()

router.route('/:profileId').put(isLoggedInController, putProfileController)

export const profileRoute = {basePath, router}

