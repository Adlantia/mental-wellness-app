import {Request, Response} from "express"
import {Status} from "../../utils/interfaces/Status"
import {createJournal, getJournalEntries, Journal} from "./journal.model"
import {JournalSchema} from "./journal.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {PrivateProfile} from "../profile/profile.model"

export async function createJournalController(request: Request, response: Response): Promise<Response | undefined> {
    try {
        const validationResult = JournalSchema.safeParse(request.body)

        if(!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        const {journalId, journalDateTime, journalText, journalTitle} = validationResult.data

        const profile: PrivateProfile = request.session.profile as PrivateProfile

        const journalProfileId: string = profile.profileId as string

        const journal : Journal = {
            journalProfileId,
            journalId: null,
            journalDateTime: null,
            journalText,
            journalTitle
        }

        const result = await createJournal(journal)

        const status: Status = {status: 200, message: result, data: null}
        return response.json(status)
    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: 'Error creating journal',
            data: null
        })
    }
}

export async function getJournalEntriesController(request: Request, response: Response): Promise<Response | undefined> {
    try {
        const data = await getJournalEntries()

        const status: Status = {status: 200, message: null, data}
        return response.json(status)
    } catch (error) {
        console.log(error)
        return response.json({
            status: 500,
            message: 'Error retrieving journal entries',
            data: []
        })
    }
}