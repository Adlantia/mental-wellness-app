import { Request, Response } from "express";
import {TrackerSchema} from "./tracker.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {PrivateProfile} from "../profile/profile.model";
import {insertTracker} from "./tracker.model";
import {Status} from "../../utils/interfaces/Status";


export async function postTrackerController(request: Request, response: Response): Promise<Response | undefined> {
    try {

        // validate the incoming request with the tracker schema
        const validationResult = TrackerSchema.safeParse(request.body)

        // if the validation fails, return a response to the client
        if (!validationResult.success) {
            return zodErrorResponse(response, validationResult.error)
        }

        // get tracker data from the request body
        const {trackerId, trackerCategory, trackerQuestion} = validationResult.data

        // get the profile from the session
        const profile: PrivateProfile = request.session.profile as PrivateProfile

        // set the tracker profile id to the profile id from the session
        const trackerProfileId: string = profile.profileId as string

        // insert the tracker into the database and store the result in a variable called result
        const result = await insertTracker(tracker)

        // return the response with the status code 200, a message, and the result as data
        const status: Status = {status: 200, message: result, data: null}
        return response.json(status)

        // if there is an error,  return the response with the status 500, an error message, and null data
    } catch (error) {
        console.log(error)
        return response.json({status:500, message: 'Error creating tracker. Try again.', data: null})
    }
}

