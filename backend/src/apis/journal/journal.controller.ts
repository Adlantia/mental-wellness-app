import {Request, Response} from "express"
import {Status} from "../../utils/interfaces/Status"
import {
    createJournal,
    Journal,
    selectJournalsByJournalProfileId,
    selectJournalEntries,
    selectJournalByJournalId
} from "./journal.model"
import {JournalSchema} from "./journal.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {PrivateProfile, PublicProfile} from "../profile/profile.model"

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

        const status: Status = {status: 200, message: "Successfully created journal", data: result}
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
        const data = await selectJournalEntries()

        const status: Status = {
            status: 200,
            message: null,
            data
        }
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

export async function getJournalByJournalProfileIdController (request: Request, response: Response) : Promise <Response> {
    try{
       const profile = request.session.profile as PublicProfile

       const journalProfileId = profile.profileId as string

       const data = await selectJournalsByJournalProfileId(journalProfileId)

        // return the response with the status code 200, a message, and the log as data
        return response.json({ status: 200, message: null, data })

        //if an error occurs, return the error to the user
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}

export async function getJournalByJournalId(request: Request, response: Response) : Promise <Response> {
    try{
        const profile = request.session.profile as PublicProfile

        const {journalId} = request.params

        const data = await selectJournalByJournalId(journalId)
        if(data?.journalProfileId !== profile.profileId) {
            return response.json({status:400, message: "you are not allowed to perform this task lol", data:null})
        }
        // return the response with the status code 200, a message, and the log as data
        return response.json({ status: 200, message: null, data })

        //if an error occurs, return the error to the user
    } catch (error) {
        return response.json({
            status: 500,
            message: '',
            data: []
        })
    }
}