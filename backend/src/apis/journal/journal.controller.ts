import {Request, Response} from "express"
import {Status} from "../../utils/interfaces/Status"
import {createJournal, Journal, selectJournalsByJournalProfileId, selectJournalEntries} from "./journal.model"
import {JournalSchema} from "./journal.validator"
import {zodErrorResponse} from "../../utils/response.utils"
import {PrivateProfile, PublicProfile} from "../profile/profile.model"
import {selectLogsByLogProfileId} from "../log/log.model";

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

export async function getJournalsByJournalProfileIdController (request: Request, response: Response) :Promise <Response> {
    try{
        //deconstruct the profile from the session
        const profile = request.session.profile as PublicProfile

        //deconstruct the profile id from the profile
        const journalProfileId = profile.profileId as string
        console.log(journalProfileId)
        //select the journal by journal profile id
        const data =  await selectJournalsByJournalProfileId(journalProfileId)

        //return the status and the logs associated with the profile
        return response.json({status:200, message:null, data})

        //if an error occurs, return the error to the user
    }   catch (error) {
        return response.json({
            status: 500,
            message: '',
        })