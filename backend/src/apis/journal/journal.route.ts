import { Router } from 'express'
import {createJournalController} from "./journal.controller"
import {getJournalEntries} from "./journal.model";

const basePath = '/apis/journal'

const router = Router()

router.route('/')
    .post(createJournalController)
    .get(getJournalEntries)

export const journalRoute = {router, basePath}
