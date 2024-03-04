import { Request, Response } from "express";
import {TrackerSchema} from "./tracker.validator";
import {zodErrorResponse} from "../../utils/response.utils";
import {PrivateProfile} from "../profile/profile.model";


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
    }
}