import { Router } from 'express'
import {createJournalController} from "./journal.controller"

const basePath = '/apis/journal'

const router = Router()

router.route('/')
    .post(createJournalController)

export const journalRoute = {router, basePath}
