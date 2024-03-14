import { Router } from 'express'
import {
    createJournalController,
    getJournalsByJournalProfileIdController,
    getJournalEntriesController
} from "./journal.controller"
import {isLoggedInController} from "../../utils/controllers/isLoggedIn.controller";

const basePath = '/apis/journal'

const router = Router()

router.route('/')
    .post(createJournalController)
    .get(getJournalEntriesController)

export const journalRoute = {router, basePath}

router.route('/')
    .post(isLoggedInController, createJournalController)
    .get(isLoggedInController, getJournalsByJournalProfileIdController)

// router.route('/journalId/:journalId')
//     .get(isLoggedInController, getJournalByJournalId)


