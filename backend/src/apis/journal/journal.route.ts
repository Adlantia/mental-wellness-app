import { Router } from 'express'
import {createJournalController, getJournalEntriesController} from "./journal.controller"

const basePath = '/apis/journal'

const router = Router()

router.route('/')
    .post(createJournalController)
    .get(getJournalEntriesController)

export const journalRoute = {router, basePath}
