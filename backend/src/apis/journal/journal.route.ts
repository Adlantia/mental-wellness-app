import { Router } from 'express'
import {
    createJournalController,
    getJournalByJournalProfileIdController,
    getJournalEntriesController
} from "./journal.controller"
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";

const basePath = '/apis/journal'

const router = Router()


export const journalRoute = {router, basePath}

router.route('/')
    .post(isLoggedInController, createJournalController)
    .get(isLoggedInController, getJournalByJournalProfileIdController)
